import './style.css';
import LoginForm from '../../components/login/loginForm';
import Footer from '../../components/login/footer';

export default function Login() {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <div className="register"></div>
        <Footer />
      </div>
    </div>
  );
}
