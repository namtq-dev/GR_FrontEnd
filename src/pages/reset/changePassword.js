import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import { Link } from 'react-router-dom';

export default function ChangePassword({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
}) {
  return (
    <div className="reset_form" style={{ height: '310px' }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Reset your Aimer password.</div>
      <Formik enableReinitialize initialValues={{ password, confirmPassword }}>
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="password"
              placeholder="New password"
              onChange={(eve) => setPassword(eve.target.value)}
            />
            <LoginInput
              type="text"
              name="confirmPassword"
              placeholder="Confirm your new password"
              onChange={(eve) => setConfirmPassword(eve.target.value)}
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
