import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3080/api/user/login', {email, password})
        .then(result => {
            if(result.data.msg === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/home');
            }
            else if(result.data.msg === 'User does not exists.'){
                alert('Account is not found please register');
            }
            else if(result.data.msg === 'Invalid username or password.'){
                alert('Invalid username or password.');
            }
        })
        .catch(err => console.log(err));
    }


    return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
        <div className="d-flex justify-content-center align-items-center text-center vh-100">
            <div className="p-3 rounded" style={{ width: '40%' }}>
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
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
                {/* TO add ' appostopee */}
                <p className="container my-2">Don&apos;t have an account?</p>
                <Link to="/register" className="btn btn-secondary">
                    Register
                </Link>
            </div>
        </div>
    </div>
);

}

export default Login