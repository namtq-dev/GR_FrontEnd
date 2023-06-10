import { Form, Formik } from 'formik';
import LoginInput from '../../components/inputs/loginInput';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function ChangePassword({
  userInfos,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();

  const changePassword = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email: userInfos.email,
        password,
      });
      setError('');
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        'Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &).'
      )
      .min(6, 'Password must be at least 6 characters long.')
      .max(50, 'Password must be at most 50 characters long.'),
    confirmPassword: Yup.string()
      .required('Confirm your new password')
      .oneOf([Yup.ref('password')], 'Password does not match'),
  });

  return (
    <div className="reset_form" style={{ height: '310px' }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Reset your Aimer password.</div>
      <Formik
        enableReinitialize
        initialValues={{ password, confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              placeholder="New password"
              onChange={(eve) => setPassword(eve.target.value)}
            />
            <LoginInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              onChange={(eve) => setConfirmPassword(eve.target.value)}
              bottom
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
