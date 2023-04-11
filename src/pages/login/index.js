import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import './style.css';
import LoginInput from '../../components/inputs/loginInput';
import { useState } from 'react';
import * as Yup from 'yup';

const loginInfos = {
  email: '',
  password: '',
};

const loginValidation = Yup.object({
  email: Yup.string()
    .required('Email address is required')
    .email('Invalid email')
    .max(100),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);

  const handleLoginChange = (eve) => {
    const { name, value } = eve.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/aimer4.png" alt="" />
            <span>
              Aimer helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{ email, password }}
                validationSchema={loginValidation}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                      bottom
                    />
                    <button className="blue_btn" type="submit">
                      Log in
                    </button>
                  </Form>
                )}
              </Formik>
              <Link className="forgot_password" to="/forgot">
                Forgotten password?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">
                Create New Account
              </button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page</b> for a celebrity, brand or business.
            </Link>
          </div>
        </div>
        <div className="register"></div>
        <footer className="login_footer">
          <div className="login_footer_wrap">
            <Link to="/">English (UK)</Link>
            <Link to="/">Tiếng Việt</Link>
            <Link to="/">中文(台灣)</Link>
            <Link to="/">한국어</Link>
            <Link to="/">日本語</Link>
            <Link to="/">Français (France)</Link>
            <Link to="/">ภาษาไทย</Link>
            <Link to="/">Español</Link>
            <Link to="/">Português (Brasil)</Link>
            <Link to="/">Deutsch</Link>
            <Link to="/">Italiano</Link>
            <Link to="/" className="footer_square">
              <i className="plus_icon"></i>
            </Link>
          </div>
          <div className="footer_splitter"></div>
          <div className="login_footer_wrap">
            <Link to="/">Sign Up</Link>
            <Link to="/">Log in</Link>
            <Link to="/">Messenger</Link>
            <Link to="/">Aimer Lite</Link>
            <Link to="/">Watch</Link>
            <Link to="/">Places</Link>
            <Link to="/">Games</Link>
            <Link to="/">Marketplace</Link>
            <Link to="/">Aimer Pay</Link>
            <Link to="/">Oculus</Link>
            <Link to="/">Portal</Link>
            <Link to="/">Instagram</Link>
            <Link to="/">Bulletin</Link>
            <Link to="/">Local</Link>
            <Link to="/">Fundraisers</Link>
            <Link to="/">Services</Link>
            <Link to="/">Voting Information Centre</Link>
            <Link to="/">Groups</Link>
            <Link to="/">About</Link>
            <Link to="/">Create ad</Link>
            <Link to="/">Create Page</Link>
            <Link to="/">Developers</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Privacy</Link>
            <Link to="/">Cookies</Link>
            <Link to="/">
              AdChoices
              <i className="adChoices_icon"></i>
            </Link>
            <Link to="/">Terms</Link>
            <Link to="/">Help</Link>
          </div>
          <div className="login_footer_wrap">
            <Link to="/" style={{ fontSize: '12px', marginTop: '10px' }}>
              Meta © 2023
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
