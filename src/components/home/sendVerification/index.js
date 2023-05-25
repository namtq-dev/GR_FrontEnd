import { useState } from 'react';
import './style.css';

export default function SendVerification() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <div className="send_verification">
      <span>
        Your account is not verified. Please verify your account before it gets
        deleted after a month from creating.
      </span>
      <a href="">Click here to resend the verification link.</a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
