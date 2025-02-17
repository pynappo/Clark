import React, { useState } from 'react';

import { memberApplicationState, memberShipPlanToString } from '../../Enums';
import { registerUser } from '../../APIFunctions/Auth';
import GoogleRecaptcha from '../../Components/Captcha/GoogleRecaptcha';
export default function MembershipForm(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassWord] = useState('');
  const [major, setMajor] = useState('Other');
  const [plan, setPlan] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [clickSubmitted, setClickSubmitted] = useState(false);
  const VALID_EMAIL_REGEXP = new RegExp(
    '^\\s*(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)' +
    '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])' +
    '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))\\s*$'
  );

  const checkValidEmail = () => {
    return email && VALID_EMAIL_REGEXP.test(email);
  };

  const checkValidPassword = () => {
    return (
      password &&
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const invalidEmailAlert = () => {
    if (clickSubmitted) {
      if (!email) {
        return <p
          className='text-red-500'
        >Email cannot be left empty</p>;
      }
      if (!checkValidEmail()) {
        return <p
          className='text-red-500'
        >Your input email is invalid</p>;
      }
      if (!usernameAvailable) {
        return (
          <p className='text-red-500'>
            An account with this email already exists. Contact{' '}
            <a href='mailto:asksce@gmail.com'>
              asksce@gmail.com</a>{' '}
              if you forgot your password.
          </p>
        );
      }
    }
  };

  const invalidPasswordAlert = () => {
    if (!password) {
      return (
        clickSubmitted && (
          <p
            className='text-red-500'
          >Password cannot be left empty</p>
        )
      );
    }

    const lengthClass =
      (password.length >= 8 ? 'hidden' : 'text-red-500');
    const lowercaseClass =
      (/[a-z]/.test(password) ? 'hidden ' : 'text-red-500');
    const uppercaseClass =
      (/[A-Z]/.test(password) ? 'hidden' : 'text-red-500');
    const numberClass =
      (/\d/.test(password) ? 'hidden' : 'text-red-500');

    return (
      (
        <ul>
          <li id='passwordLengthRequirement' className={lengthClass}>
            8 or more characters
          </li>
          <li id='passwordLowercaseRequirement' className={lowercaseClass}>
            a lowercase letter
          </li>
          <li id='passwordUppercaseRequirement' className={uppercaseClass}>
            an uppercase letter
          </li>
          <li id='passwordNumberRequirement' className={numberClass}>
            a number 0-9
          </li>
        </ul>
      )
    );
  };

  const invalidConfirmPasswordAlert = () => {
    if (checkValidPassword()) {
      if (!confirmPassword) {
        return (
          clickSubmitted && (
            <p
              className='text-red-500'
            >Please confirm your password</p>
          )
        );
      }
      if (password !== confirmPassword) {
        const validOrInvalid =
         password === confirmPassword ? 'hidden' : 'text-red-500';
        const maybeDoNot =  password === confirmPassword ? '' : 'do not';
        return <p
          className={validOrInvalid}
        >Passwords {maybeDoNot} match</p>;
      }
    }
  };

  const requiredFieldsMet = () => {
    return (
      (process.env.NODE_ENV !== 'production' || captchaValue) &&
      firstName &&
      lastName &&
      checkValidEmail() &&
      major &&
      checkValidPassword() &&
      password === confirmPassword
    );
  };

  const nameFields = [
    {
      label: 'First Name*',
      id: 'first-name-field',
      type: 'text',
      handleChange: (e) => setFirstName(e.target.value),
      ifRequirementsNotMet: clickSubmitted && !firstName && (
        <p
          className='text-red-500'
        >First name cannot be left empty</p>
      ),
    },
    {
      label: 'Last Name*',
      id: 'last-name-field',
      type: 'text',
      ifRequirementsNotMet: clickSubmitted && !lastName && (
        <p
          className='text-red-500'
        >Last name cannot be left empty</p>
      ),
      handleChange: (e) => setLastName(e.target.value),
    },
  ];
  const accountFields = [
    {
      label: 'Email*',
      type: 'email',
      id: 'email-field',
      ifRequirementsNotMet: invalidEmailAlert(),
      handleChange: (e) => {
        setEmail(e.target.value);
        if (!usernameAvailable) setUsernameAvailable(true);
      },
    },
    {
      label: 'Password*',
      type: 'password',
      id: 'password-field',
      ifRequirementsNotMet: invalidPasswordAlert(),
      handleChange: (e) => setPassword(e.target.value),
    },
    {
      label: 'Confirm password*',
      type: 'password',
      id: 'confirm-password-field',
      ifRequirementsNotMet: invalidConfirmPasswordAlert(),
      handleChange: (e) => setConfirmPassWord(e.target.value),
    },

  ];

  function membershipExpDate(semestersToSignUpFor = 1) {
    const today = new Date();

    const endOfSpringSemThisYear = `June 1, ${today.getFullYear()}`;
    const endOfSpringSemNextYear = `June 1, ${today.getFullYear() + 1}`;
    const endOfFallSemThisYear = `January 1, ${today.getFullYear() + 1}`;

    // Lookup table to resolve a readble expiration date for a
    // new member. The first key is the number of semesters they
    // wish to sign up for and the second (nested) key is whether
    // this page was rendered during spring time or not.
    const expirationMap = {
      1: {
        true: endOfSpringSemThisYear,
        false: endOfFallSemThisYear
      },
      2: {
        true: endOfFallSemThisYear,
        false: endOfSpringSemNextYear
      }
    };

    // spring checks if current month is between January and May
    const spring = today.getMonth() >= 0 && today.getMonth() <= 4;

    return expirationMap[semestersToSignUpFor][spring];
  }

  const submitApplication = async (e) => {
    e.preventDefault();
    if (!clickSubmitted) setClickSubmitted(true);
    if (requiredFieldsMet()) {
      const registrationStatus = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        major,
        numberOfSemestersToSignUpFor: props.selectedPlan,
        captchaToken: captchaValue,
      });

      if (!registrationStatus.error) {
        props.setMembershipState(memberApplicationState.CONFIRMATION);
      } else {
        if (registrationStatus.responseData.status === 409) {
          setUsernameAvailable(false);
          window.alert('An account with this email already exists');
        } else if (registrationStatus.responseData.status === 400) {
          window.alert(registrationStatus.responseData.data.message);
        }
      }
    }
  };

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };

  const handlePlanChange = (event) => {
    setPlan(event.target.value);
  };

  return (
    <div className=''>
      <div className = 'flex-none md:flex mb-20'>
        <div className='rounded-3xl backdrop-blur-sm shadow-2xl mt-20 mb-auto ml-auto mr-auto px-10 text-center items-center justify-center'>
          <div className = 'text-lg md:text-3xl font-bold pb-2'>
            Semester Plan
          </div>
          <div className="stats stats-vertical text-lg md:text-3xl shadow">
            <div className="stat text-lg md:text-3xl">
              <div className="stat-title text-2xl md:text-3xl">Price</div>
              <div className="stat-value text-2xl md:text-3xl">$20</div>
              <div className="stat-desc">1 semester</div>
            </div>

            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Expires</div>
              <div className="stat-value text-2xl md:text-3xl">{membershipExpDate()}</div>
              <div className="stat-desc">↗︎ Only Up From here</div>
            </div>
          </div>
          <div className = 'text-lg md:text-3xl font-bold  pb-2 pt-4'>
            Yearly Plan
          </div>
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Price</div>
              <div className="stat-value text-2xl md:text-3xl">$30</div>
              <div className="stat-desc">2 semester</div>
            </div>

            <div className="stat">
              <div className="stat-title text-2xl md:text-3xl">Expires</div>
              <div className="stat-value text-2xl md:text-3xl">{membershipExpDate(2)}</div>
              <div className="stat-desc">↗︎ Only Up From here</div>
            </div>
          </div>
          <div className='venmo-link text-2xl  md:text-3xl  py-3'>
            <a
              href='https://venmo.com/u/steeevin'
              style={{ color: 'white' }}
              className='opacity-50 hover:opacity-100 font-bold underline duration-300'
            >
              Click to pay fee
            </a>
            <p className='text-sm no-underline '> You do not need to pay to make an account</p>
          </div>
        </div>
        <div className='rounded-3xl backdrop-blur-sm shadow-2xl mt-20 ml-auto mr-auto px-10 text-center items-center justify-center xl:max-w-[35%]'>
          <p className='text-3xl font-bold' >Membership Application</p>
          <p className='text-2xl font-bold '>
            Year: {new Date().getFullYear()}
          </p>
          <h6 className='text-lg'>
            * = Required field
          </h6>
          <form onSubmit={submitApplication}>
            <div id='name-field-row'>
              {nameFields.map((input, index) => (
                <div
                  className=' opacity-90 rounded-sm font-sans placeholder-gray-800 text-black'
                  key={`name-field-input-${index}`}>
                  <input
                    type={input.type}
                    onChange={input.handleChange}
                    id={input.id}
                    placeholder={input.label}
                    className='w-full bg-[#ABC9CF] rounded-full mt-4 placeholder-gray-800 text-black pl-2'
                  />
                  {input.ifRequirementsNotMet}
                </div>
              ))}
            </div>
            <div id='email-input-container'>
              {accountFields.map((input, index) => (
                <div
                  className='opacity-70 rounded-sm font-sans placeholder-gray-800 text-black'
                  key={`account-field-${index}`}>
                  <input
                    type={input.type}
                    onChange={input.handleChange}
                    id={input.id}
                    placeholder={input.label}
                    className='w-full bg-[#ABC9CF] rounded-full mt-4 placeholder-gray-800 text-black pl-2'
                  />
                  {input.ifRequirementsNotMet}
                </div>
              ))}
            </div>
            {/* <MajorDropdown setMajor={setMajor} />
            <PlanDropdown setPlan={setPlan} /> */}
            <p className='text-xl text-center mt-4'> Select Major </p>
            <div className='flex text-center text-gray-100 justify-center gap-4'>
              <label className="label gap-1.5">
                <p className='text-bold'> CS </p>
                <input type="radio" name="radio-10" className="radio" value='Computer Science'   onClick={handleMajorChange}/>
              </label>
              <label className="label gap-1.5">
                <p className='text-bold'> SWE </p>
                <input type="radio" name="radio-10" className="radio" value='Software Engineering'  onClick={handleMajorChange}/>
              </label>
              <label className="label gap-1.5">
                <p className='text-bold'> CMPE </p>
                <input type="radio" name="radio-10" className="radio" value='Computer Engineering'  onClick={handleMajorChange}/>
              </label>
              <label className="label gap-1.5">
                <p className='text-bold'> Other </p>
                <input type="radio" name="radio-10" className="radio" value='Other'  onClick={handleMajorChange}/>
              </label>
            </div>
            <p className='text-xl text-center'> Select Plan </p>
            <div className='flex text-center text-gray-100 justify-center gap-4 mb-4'>
              <label className="label gap-1.5">
                <p className='text-bold'> Semester </p>
                <input type="radio" name="radio-11" className="radio" value='Semester'   onClick={handlePlanChange}/>
              </label>
              <label className="label gap-1.5">
                <p className='text-bold'> Annual </p>
                <input type="radio" name="radio-11" className="radio" value='Annual'  onClick={handlePlanChange}/>
              </label>
              <label className="label gap-1.5">
                <p className='text-bold'> None </p>
                <input type="radio" name="radio-11" className="radio" value='None'  onClick={handlePlanChange}/>
              </label>
            </div>
            <div id='recaptcha'>
              <GoogleRecaptcha setCaptchaValue={setCaptchaValue} />
              {clickSubmitted && (process.env.NODE_ENV === 'production' && !captchaValue) && (
                <p
                  className='text-red-500'
                >Please complete the reCAPTCHA</p>
              )}
            </div>
            <div className=''>
              <div className=''>
                <button className = 'btn my-8' type='submit'>
                Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
