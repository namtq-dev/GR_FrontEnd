import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import { Link } from 'react-router-dom';

export default function SearchAccount({ email, setEmail, error }) {
  return (
    <div className="reset_form">
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address to search for your account.
      </div>
      <Formik enableReinitialize initialValues={{ email }}>
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              placeholder="Email address"
              onChange={(eve) => setEmail(eve.target.value)}
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
