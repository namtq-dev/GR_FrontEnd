import { Form, Formik } from 'formik';
import { useState } from 'react';
import RegisterInput from '../inputs/registerInput';
import * as Yup from 'yup';
import DateOfBirthSelect from './dateOfBirthSelect';
import GenderSelect from './genderSelect';
import DotLoader from 'react-spinners/DotLoader';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerInfos = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: '',
  };

  const [register, setRegister] = useState(registerInfos);
  const { firstName, lastName, email, password, bYear, bMonth, bDay, gender } =
    register;

  const handleRegisterChange = (eve) => {
    const { name, value } = eve.target;
    setRegister({ ...register, [name]: value });
  };

  const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
  );

  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const totalDaysInMonth = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(
    new Array(totalDaysInMonth()),
    (val, index) => 1 + index
  );

  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("What's your name?")
      .min(3, 'First name must be at least 3 characters long.')
      .max(30, 'First name must be at most 30 characters long.')
      .matches(/^[aA-zZ]+$/, 'Numbers and special characters are not allowed.'),
    lastName: Yup.string()
      .required("What's your name?")
      .min(3, 'Last name must be at least 3 characters long.')
      .max(30, 'Last name must be at most 30 characters long.')
      .matches(
        /^[aA-zZ\s]+$/,
        'Numbers and special characters are not allowed. White space is allowed.'
      ),
    email: Yup.string()
      .required(
        "You'll use this when you log in and if you ever need to reset your password."
      )
      .email('Please enter a valid email address.'),
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters long.')
      .max(50, 'Password must be at most 50 characters long.'),
  });

  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        { firstName, lastName, email, password, bYear, bMonth, bDay, gender }
      );
      setError('');
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 3000);
    } catch (error) {
      setLoading(false);
      setSuccess('');
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>It's quick and easy.</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            firstName,
            lastName,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let currentDate = new Date();
            let registeredDate = new Date(bYear, bMonth - 1, bDay);
            let atLeast14 = new Date(1970 + 14, 0, 1);
            let atMost70 = new Date(1970 + 70, 0, 1);
            if (currentDate - registeredDate < atLeast14) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
              setGenderError('');
            } else if (currentDate - registeredDate > atMost70) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
              setGenderError('');
            } else if (gender === '') {
              setDateError('');
              setGenderError(
                'Please choose a gender. You can change who can see this later.'
              );
            } else {
              setDateError('');
              setGenderError('');
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="lastName"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="email"
                  placeholder="Email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{' '}
                <span>Terms, Privacy Policy &nbsp;</span>
                and <span>Cookies Policy</span>. You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" type="submit">
                  Sign Up
                </button>
              </div>
              <DotLoader color="#1876f2" loading={loading} size={30} />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
