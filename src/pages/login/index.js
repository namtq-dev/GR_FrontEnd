import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import './style.css';
import LoginInput from '../../components/inputs/loginInput';
import { useState } from 'react';

const loginInfos = {
  email: '',
  password: '',
};

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
              <Formik enableReinitialize initialValues={{ email, password }}>
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
      </div>
    </div>
  );
}
