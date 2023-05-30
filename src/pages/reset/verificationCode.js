import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import { Link } from 'react-router-dom';

export default function VerificationCode({ code, setCode, error }) {
  return (
    <div className="reset_form">
      <div className="reset_form_header">Verification Code</div>
      <div className="reset_form_text">
        Please enter the code that has been sent to your email.
      </div>
      <Formik enableReinitialize initialValues={{ code }}>
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              placeholder="Verification code"
              onChange={(eve) => setCode(eve.target.value)}
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
