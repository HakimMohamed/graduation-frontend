import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import React,{Component} from 'react';
	const Forgot = () => {
		const [email, setEmail] = useState('');
		const [error, setError] = useState('');
		const [success, setSuccess] = useState('');
		const navigate = useNavigate();
	  
		const handleSubmit = async (event) => {
		  event.preventDefault();
	  
		  try {
			const response = await axios.get('http://localhost:3080/api/user/validate', {
			  email,
			});
	  
			if (response.data.status === 'success') {
			  setSuccess('Password reset email sent!');
			  navigate('/Reset');
			} else if (response.data.status === 'failed') {
			  setError('User not found. Please check your email.');
			} else {
			  setError('Failed to initiate password reset. Please try again.');
			}
		  } catch (error) {
			console.error('Error initiating password reset:', error);
			setError('Something went wrong. Please try again.');
		  }
		};
	  
		return (
		  <div>
			<div className="d-flex justify-content-center align-items-center text-center vh-100 container-fluid">
			  <div className="p-3 rounded" style={{ backgroundColor: '#f0f0f0', width: '20%', height: '35%' }}>
				<form onSubmit={handleSubmit}>
				  <div className="mb-3 text-start">
					<input
					  type="email"
					  placeholder="Enter Email"
					  className="form-control"
					  id="exampleInputEmail1"
					  onChange={(event) => setEmail(event.target.value)}
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
				  Remember your password?{' '}
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
	  
	  export default Forgot;