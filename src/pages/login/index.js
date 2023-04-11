import './style.css';
import LoginForm from '../../components/login/loginForm';
import Footer from '../../components/login/footer';
import RegisterForm from '../../components/login/registerForm';

export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <RegisterForm />
        <Footer />
      </div>
    </div>
  );
}
