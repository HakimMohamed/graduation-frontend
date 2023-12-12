
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
  const { token } = useParams();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch('http://localhost:3080/api/user/changepassword', {
        email,
        password: newPassword,
        confirmPassword:confirmPassword,
      });

      if (response.data.status === 'success') {
        setSuccess('Password reset successful! You can now log in with your new password.');
      } else {
        setError('Password reset failed. Please try again.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100 container-fluid">
        <div className="p-3 rounded" style={{ backgroundColor: '#f0f0f0', width: '20%', height: '35%' }}>
          <form onSubmit={handleReset}>
            <div className="mb-3 text-start">
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <input
                type="password"
                placeholder="Enter New Password"
                className="form-control"
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <input
                type="password"
                placeholder="Confirm New Password"
                className="form-control"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Reset Password
            </button>
          </form>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <p className="container my-7" style={{ marginTop: '1rem' }}>
            
            <Link to="/login" className="">
              {' '}
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reset;



