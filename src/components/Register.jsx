import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post('http://localhost:3080/api/user/register', {
				name: { first: firstName, last: lastName },
				email,
				password,
			})
			.then((result) => {
				if (result.data.msg === 'Exists') {
					setError('E-mail already registered! Please Login to proceed.');
					setSuccess('');
				} else if (result.data.msg === 'User Created Successfully') {
					setError('');
					setSuccess('Registered successfully! Please Login to proceed.');
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<div className="d-flex justify-content-center align-items-center text-center vh-100">
				<div className="p-3 rounded" style={{ backgroundColor: '#f0f0f0', width: '20%', height: '55%' }}>
					<form onSubmit={handleSubmit}>
						<div className="mb-3 text-start">
							<input
								type="text"
								placeholder="Enter First Name"
								className="form-control"
								id="exampleInputFirstName"
								onChange={(event) => setFirstName(event.target.value)}
								required
							/>
						</div>
						<div className="mb-3 text-start">
							<input
								type="text"
								placeholder="Enter Second Name"
								className="form-control"
								id="exampleInputLastName"
								onChange={(event) => setLastName(event.target.value)}
								required
							/>
						</div>

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
							Register
						</button>
					</form>

					{error && (
						<p className="text-danger" style={{ marginTop: '3rem' }}>
							{error}{' '}
						</p>
					)}
					{success && (
						<p className="text-success" style={{ marginTop: '3rem' }}>
							{success}
						</p>
					)}

					<p className="container my-7" style={{ marginTop: '3rem' }}>
						Already have an account?{' '}
						<Link to="/login" className="">
							{' '}
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
