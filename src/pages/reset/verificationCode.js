import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export default function VerificationCode({ code, setCode, error }) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required('Verification code is required')
      .min('5', 'Invalid verification code')
      .max('5', 'Invalid verification code'),
  });

  return (
    <div className="reset_form">
      <div className="reset_form_header">Verification Code</div>
      <div className="reset_form_text">
        Please enter the code that has been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
      >
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
