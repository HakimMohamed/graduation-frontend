import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post('http://localhost:3080/api/user/login', { email, password })
			.then((result) => {
				if (result.data.msg === 'Success') {
					console.log('Login Success');
					setSuccess('Login successful!');
					navigate('/home');
				} else if (result.data.msg === 'User does not exists.') {
					setError('Account not found. Please register.');
				} else if (result.data.msg === 'Invalid username or password.') {
					setError('Invalid username or password.');
				}
			})
			.catch((err) => console.log(err));
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
						<div className="mb-3 text-start">
							<input
								type="password"
								placeholder="Enter Password"
								className="form-control"
								id="exampleInputPassword1"
								onChange={(event) => setPassword(event.target.value)}
								required
							/>
						</div>
						<button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
							Login
						</button>
					</form>
					{error && <p className="text-danger">{error}</p>}
					{success && <p className="text-success">{success}</p>}
					<p className="container my-7" style={{ marginTop: '1rem' }}>
						Don&apos;t have an account?{' '}
						<Link to="/register" className="">
							{' '}
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
