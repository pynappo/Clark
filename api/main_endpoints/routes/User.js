'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../util/passport')(passport);
const User = require('../models/User.js');
const {
  getMemberExpirationDate,
  hashPassword,
} = require('../util/userHelpers');
const {
  checkIfTokenSent,
  checkIfTokenValid,
  decodeToken,
} = require('../util/token-functions');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
} = require('../../util/constants').STATUS_CODES;
const membershipState = require('../../util/constants').MEMBERSHIP_STATE;

const logger = require('../../util/logger');

const {sendUnsubscribeEmail} = require('../util/emailHelpers');
const crypto = require('crypto');

const ROWS_PER_PAGE = 20;

router.get('/countAllUsers', async (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, (
    membershipState.OFFICER
  ))) {
    return res.sendStatus(UNAUTHORIZED);
  }
  const search = req.query.search;
  let status = OK;
  const count = await User.find({
    $or:
      [
        { 'firstName': { '$regex': search, '$options': 'i' } },
        { 'lastName': { '$regex': search, '$options': 'i' } },
        { 'email': { '$regex': search, '$options': 'i' } }
      ]
  }, function(error, result) {
    if (error) {
      status = BAD_REQUEST;
    } else if (result == 0) {
      status = NOT_FOUND;
    }
  }).countDocuments();
  const response = {
    count
  };
  res.status(status).json(response);
});


// Delete a member
// Delete a member
router.post('/delete', async (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const decoded = decodeToken(req);
  const targetUser = await User.findById(req.body._id);
  if (!targetUser) {
    return res.sendStatus(NOT_FOUND);
  }
  // Check if req has lower privilege than the account they wish to delete
  if (targetUser.accessLevel !== 'undefined') {
    if (decoded.accessLevel < targetUser.accessLevel) {
      return res
        .status(FORBIDDEN)
        .json( { message: 'you must have higher privileges to delete users with lower privileges'});
    }
  }
  // If not officer, only allow deletion of own account
  if (decoded.accessLevel < membershipState.OFFICER) {
    if (req.body._id && req.body._id !== decoded._id) {
      return res
        .status(FORBIDDEN)
        .json({ message: 'you must be an officer or admin to delete other users' });
    }
  }

  User.deleteOne({ _id: req.body._id }, function(error, user) {
    if (error) {
      logger.error('Unable to delete user with id', req.body._id, error);
      return res.sendStatus(BAD_REQUEST);
    }

    if (user.n < 1) {
      return res.sendStatus(NOT_FOUND);
    }
    return res.sendStatus(OK);
  });
});

// Search for a member
router.post('/search', function(req, res) {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.ALUMNI)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  User.findOne({ email: req.body.email }, function(error, result) {
    if (error) {
      res.status(BAD_REQUEST).send({ message: 'Bad Request.' });
    }

    if (!result) {
      return res
        .status(NOT_FOUND)
        .send({ message: `${req.body.email} not found.` });
    }

    const user = {
      firstName: result.firstName,
      middleInitial: result.middleInitial,
      lastName: result.lastName,
      email: result.email,
      emailVerified: result.emailVerified,
      emailOptIn: result.emailOptIn,
      discordUsername: result.discordUsername,
      discordDiscrim: result.discordDiscrim,
      discordID: result.discordID,
      active: result.active,
      accessLevel: result.accessLevel,
      major: result.major,
      joinDate: result.joinDate,
      lastLogin: result.lastLogin,
      membershipValidUntil: result.membershipValidUntil,
      pagesPrinted: result.pagesPrinted,
      doorCode: result.doorCode,
      _id: result._id
    };
    return res.status(OK).send(user);
  });
});

// Search for all members
router.post('/users', async function(req, res) {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  let maybeOr = {};
  if (req.body.query) {
    maybeOr = {
      $or: ['firstName', 'lastName', 'email'].map((fieldName) => ({
        [fieldName]: {
          // req.body, req.query, req.body.query, oh man
          $regex: RegExp(req.body.query, 'i'),
        }
      }))
    };
  }

  const sortColumn = req.query.sort || 'joinDate';

  const orderToInteger = {
    desc: -1,
    asc: 1,
    default: -1
  };
  const sortOrder = orderToInteger[req.query.order] || orderToInteger.default;

  // make sure that the page we want to see is 0 by default
  // and avoid negative page numbers
  let skip = Math.max(Number(req.body.page) || 0, 0);
  skip *= ROWS_PER_PAGE;
  const total = await User.count(maybeOr);
  User.find(maybeOr, { password: 0, }, { skip, limit: ROWS_PER_PAGE, })
    .sort({ [sortColumn] : sortOrder })
    .then(items => {
      res.status(OK).send({ items, total, rowsPerPage: ROWS_PER_PAGE, });
    })
    .catch((e) => {
      res.sendStatus(BAD_REQUEST);
    });
});

// Edit/Update a member record
router.post('/edit', async (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  if (!req.body._id) {
    return res.sendStatus(BAD_REQUEST);
  }

  let decoded = decodeToken(req);
  if (decoded.accessLevel < membershipState.OFFICER) {
    if (req.body.email && req.body.email != decoded.email) {
      return res
        .status(UNAUTHORIZED)
        .send('Unauthorized to edit another user');
    }
    if (req.body.accessLevel && req.body.accessLevel !== decoded.accessLevel) {
      return res
        .status(UNAUTHORIZED)
        .send('Unauthorized to change access level');
    }
  }

  if (decoded.accessLevel === membershipState.OFFICER) {
    if (req.body.accessLevel && req.body.accessLevel == membershipState.ADMIN) {
      return res.sendStatus(UNAUTHORIZED);
    }
  }

  const query = { _id: req.body._id };
  let user = req.body;

  if (typeof req.body.numberOfSemestersToSignUpFor !== 'undefined') {
    user.membershipValidUntil = getMemberExpirationDate(
      parseInt(req.body.numberOfSemestersToSignUpFor)
    );
  }

  delete user.numberOfSemestersToSignUpFor;

  if (!!user.password) {
    // hash the password before storing
    const result = await hashPassword(user.password);
    if (!result) {
      return res.sendStatus(SERVER_ERROR);
    }
    user.password = result;
  } else {
    // omit password from the object if it is falsy
    // i.e. an empty string, undefined or null
    delete user.password;
  }

  // Remove the auth token from the form getting edited
  delete user.token;

  User.updateOne(query, { ...user }, function(error, result) {
    if (error) {
      const info = {
        errorTime: new Date(),
        apiEndpoint: 'user/edit',
        errorDescription: error
      };

      res.status(BAD_REQUEST).send({ message: 'Bad Request.' });
    }

    if (result.nModified < 1) {
      return res
        .status(NOT_FOUND)
        .send({ message: `${query.email} not found.` });
    }
    return res.status(OK).send({
      message: `${query.email} was updated.`,
      membershipValidUntil: user.membershipValidUntil
    });
  });
});

router.post('/getPagesPrintedCount', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  User.findOne({ email: req.body.email }, function(error, result) {
    if (error) {
      const info = {
        errorTime: new Date(),
        apiEndpoint: 'user/PagesPrintedCount',
        errorDescription: error
      };

      res.status(BAD_REQUEST).send({ message: 'Bad Request.' });
    }

    if (!result) {
      return res
        .status(NOT_FOUND)
        .send({ message: `${req.body.email} not found.` });
    }
    return res.status(OK).json(result.pagesPrinted);
  });
});

router.post('/getUserById', async (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  // If not officer, only allow reading of own account
  let decoded = decodeToken(req);
  if (decoded.accessLevel < membershipState.OFFICER) {
    if (req.body.userID && req.body.userID !== decoded._id) {
      return res
        .status(FORBIDDEN)
        .json({ message: 'you must be an officer or admin to read other users\' data' });
    }
  }
  User.findOne({ _id: req.body.userID}, (err, result) => {
    if (err) {
      return res.sendStatus(BAD_REQUEST);
    }

    if (!result) {
      return res.sendStatus(NOT_FOUND);
    }

    const { password, ...omittedPassword } = result._doc;

    return res.status(OK).json(omittedPassword);
  });
});

router.post('/setUserEmailPreference', (req, res) => {
  const email = req.body.email;
  const emailOptIn = !!req.body.emailOptIn;

  User.updateOne(
    { email: email },
    { emailOptIn: emailOptIn },
    function(error, result) {
      if (error) {
        res.status(BAD_REQUEST).send({ message: 'Bad Request.' });
      }

      if (result.n === 0) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${email} not found.` });
      }
      return res.status(OK).send({
        message: `${email} was updated.`,
        emailOptIn: emailOptIn,
      });
    }
  );
});

router.post('/getUserDataByEmail', (req, res) => {
  User.findOne({ email: req.body.email }, function(error, result) {
    if (error) {
      res.status(BAD_REQUEST).send({ message: 'Bad Request.' });
    }

    if (!result) {
      return res
        .status(NOT_FOUND)
        .send({ message: `${req.body.email} not found.` });
    }
    const user = {
      firstName: result.firstName,
      lastName: result.lastName,
      emailOptIn: result.emailOptIn,
    };
    return res.status(OK).send(user);
  });
});

// Search for all members with verified emails and subscribed
router.post('/usersSubscribedAndVerified', function(req, res) {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  User.find({ emailVerified: true, emailOptIn: true })
    .then((users) => {
      if (users.length) {
        const userEmailAndName = users.map((user) => {
          return {
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName
          };
        });
        sendUnsubscribeEmail(userEmailAndName);
      }
      return res.sendStatus(OK);
    })
    .catch((err) => {
      res.status(BAD_REQUEST).send({ message: 'Bad Request.' });
    });
});

// Search for all members with verified emails, subscribed, and not banned or pending
router.post('/usersValidVerifiedAndSubscribed', function(req, res) {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.OFFICER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  User.find({
    emailVerified: true,
    emailOptIn: true,
    accessLevel: { $gte: membershipState.NON_MEMBER }
  })
    .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/csv');
      res.write('email\r\n');
      users.forEach(function(user) {
        res.write(user.email + '\r\n');
      });
      return res.end();
    })
    .catch((err) => {
      logger.error('/usersValidVerifiedAndSubscribed/ had an error:', err);
      res.sendStatus(BAD_REQUEST);
    });
});

// Generate an API key for the Messages API if the user does not have an API key; otherwise, return the existing API key
router.post('/apikey', async (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  }
  if (!checkIfTokenValid(req)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  let { _id } = decodeToken(req);

  User.findOne({_id})
    .then((user) => {
      if (!user) {
        return res.sendStatus(NOT_FOUND);
      }
      // logic to generate api key or return existing api key
      if (user.apiKey) {
        return res.status(OK).send({apiKey: user.apiKey});
      }
      let apiKey = crypto.randomUUID();
      User.updateOne({_id}, {apiKey})
        .then((result) => {
          if (result.n == 0) {
            return res.sendStatus(UNAUTHORIZED);
          }
          return res.status(OK).send({apiKey});
        });
    })
    .catch(() => {
      return res.sendStatus(BAD_REQUEST);
    });
});
module.exports = router;
