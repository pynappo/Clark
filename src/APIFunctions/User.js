import axios from 'axios';
import { UserApiResponse } from './ApiResponses';
import { BASE_API_URL, membershipState, userFilterType } from '../Enums';

/**
 * Queries the database for all users.
 * @param {string} token The jwt token for verification
 * @returns {UserApiResponse} Containing any error information or the array of
 * users.
 */
export async function getAllUsers({
  token,
  query = null,
  page = null,
  sortColumn = null,
  sortOrder = null,
}) {
  const url = new URL('/api/User/users', BASE_API_URL);

  if (sortColumn) {
    url.searchParams.set('sort', sortColumn);
  }

  if (sortOrder) {
    url.searchParams.set('order', sortOrder);
  }

  let status = new UserApiResponse();
  await axios
    // get all users!
    .post(
      url.href,
      {
        query,
        page,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(result => {
      status.responseData = result.data;
    })
    .catch(() => {
      status.error = true;
    });
  return status;
}

export async function getCountAllUsers(query) {
  let status = new UserApiResponse();
  const url = new URL(`/api/User/countAllUsers/${query}`, BASE_API_URL);
  await axios
    .get(url.href)
    .then(result => {
      status.responseData = result.data;
    })
    .catch(() => {
      status.error = true;
    });
  return status;
}

/**
 * Edit an existing users
 * @param {Object} userToEdit - The user that is to be updated
 * @param {(string|undefined)} userToEdit._id - MongoDB id of the user
 * @param {(string|undefined)} userToEdit.firstName - The updated first name of
 * the user
 * @param {(string|undefined)} userToEdit.lastName - The updated last name of
 * the user
 * @param {string} userToEdit.email - Used to find the specific user to update
 * @param {(string|undefined)} userToEdit.password - The updated password of
 * the user
 * @param {(string|undefined)} userToEdit.major - The updated major of
 * the user
 * @param {(string|undefined)} userToEdit.discordUsername
 * @param {(string|undefined)} userToEdit.discordDiscrim
 * @param {(string|undefined)} userToEdit.discordID
 * @param {(string|undefined)} userToEdit.numberOfSemestersToSignUpFor
 * @param {(string|undefined)} userToEdit.doorCode - The updated password of
 * the user
 * @param {(string|undefined)} userToEdit.pagesPrinted - The updated password of
 * the user
 * @param {(string|undefined)} userToEdit.accessLevel - The updated password of
 * the user
 * @param {(string|undefined)} userToEdit.lastLogin - The updated password of
 * the user
 * @param {(string|undefined)} userToEdit.emailVerified - If the user's email
 * was verified
 * @param {(string|undefined)} userToEdit.emailOptIn - Opt into SCE's blast
 * week emails
 * @param {string} token - The jwt token for authentication
 * @returns {UserApiResponse} containing if the search was successful
 */
export async function editUser(userToEdit, token) {
  let status = new UserApiResponse();
  const {
    _id,
    firstName,
    lastName,
    email,
    password,
    major,
    numberOfSemestersToSignUpFor,
    doorCode,
    discordUsername,
    discordDiscrim,
    discordID,
    pagesPrinted,
    accessLevel,
    lastLogin,
    emailVerified,
    emailOptIn,
  } = userToEdit;
  const url = new URL('/api/User/edit', BASE_API_URL);
  await axios
    .post(url.href, {
      _id,
      firstName,
      lastName,
      email,
      password,
      major,
      numberOfSemestersToSignUpFor,
      doorCode,
      discordUsername,
      discordDiscrim,
      discordID,
      pagesPrinted,
      accessLevel,
      lastLogin,
      emailVerified,
      emailOptIn
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => {
      status.responseData = result.data;
    })
    .catch(err => {
      status.error = true;
      status.responseData = err.response;
    });
  return status;
}

/**
 * Updates the user's last login date when they log in.
 * @param {string} email The email of the user
 * @param {string} token The JWT token to allow the user to be edited
 */
export async function updateLastLoginDate(email, token) {
  await editUser({ email, lastLogin: Date.now() }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

/**
 * Deletes a user by an ID
 * @param {string} _id The ID of the user to delete
 * @param {string} token jwt token to authorize deletion
 * @returns {UserApiResponse} containing if the search was successful
 */
export async function deleteUserByID(_id, token) {
  let status = new UserApiResponse();
  const url = new URL('/api/User/delete', BASE_API_URL);
  axios
    .post(url.href, {
      _id,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .catch(() => {
      status.error = true;
    });
  return status;
}

export async function getUserById(userID, token) {
  let status = new UserApiResponse();
  const url = new URL('/api/User/getUserById', BASE_API_URL);
  await axios.post(url.href,
    {userID}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = true;
    });
  return status;
}

export async function setUserEmailPreference(email, emailOptIn) {
  let status = new UserApiResponse();
  const url = new URL('/api/User/setUserEmailPreference', BASE_API_URL);
  await axios
    .post(url.href, {
      email,
      emailOptIn,
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = true;
    });
  return status;
}

export async function getUserData(email) {
  let status = new UserApiResponse();
  const url = new URL('/api/User/getUserDataByEmail', BASE_API_URL);
  await axios
    .post(url.href, {
      email,
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = true;
    });
  return status;
}

export async function getAllUserSubscribedAndVerified(token) {
  let status = new UserApiResponse();
  const url = new URL('/api/User/usersSubscribedAndVerified', BASE_API_URL);
  await axios
    .post(url.href, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = true;
    });
  return status;
}

export async function getAllUsersValidVerifiedAndSubscribed(token) {
  let status = new UserApiResponse();
  const url = new URL('/api/User/usersValidVerifiedAndSubscribed', BASE_API_URL);
  await axios
    .post(url.href, { responseType: 'blob' }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      status.responseData = res.data;
    })
    .catch((err) => {
      status.error = err;
    });
  return status;
}

export async function getApiKey(token) {
  let status = new UserApiResponse();
  try {
    const url = new URL('/api/User/apiKey', BASE_API_URL);
    const response = await axios.post(url.href, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    status.responseData = response.data;
  } catch (error) {
    status.error = true;
  }
  return status;
}
