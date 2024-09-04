	import React, { useContext, useState } from "react";
	import { useNavigate } from 'react-router-dom';
	import axios from "axios";
	import { AuthContext } from "../context/auth-context";
	import "./Login.css";
	import {toast} from "react-toastify";
/* 	import { Modal,ModalDialog,ModalClose,Typography } from "@mui/joy";
 */
	const Login = (props) => {
		const auth=useContext(AuthContext);
	const [isLogin, setLogin] = useState(true);
	const [error, setError] = useState();
	
	const [formState, setformState] = useState({
		username: '',
		password: '',
		repeatPassword: '' // For registration
	});
	const [errors, setErrors] = useState({
		username: '',
		password: '',
		repeatPassword: '' // For registration
	});

	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false); // New state for showing password

	const loginHandler = async e => {
		e.preventDefault();
		const newErrors = {};

		if (!formState.username) {
		newErrors.username = ' is required';
		} else if (formState.username.length < 8) {
		newErrors.username = '  must be at least 8 characters long';
		}

		if (!formState.password) {
		newErrors.password = 'is required';
		} else {
		const numberCount = (formState.password.match(/\d/g) || []).length;
		if (numberCount < 2) {
			newErrors.password = ' must contain at least 2 numbers';
		}
		}

		if (!isLogin && formState.password !== formState.repeatPassword) {
		newErrors.repeatPassword = ' do not match';
		}

		if (Object.keys(newErrors).length > 0) {
		setErrors(newErrors);
		return; // Stop form submission if there are errors
		}

	const localhost = process.env.BACKEND_URL || 'http://localhost:8080';

	
		try {
			const formData = new FormData();
			formData.append('username', formState.username);
			formData.append('password', formState.password);
		
			let response;
		
			if (!isLogin) {
			  formData.append('repeatPassword', formState.repeatPassword);
			  response = await axios.post(`${localhost}/api/auth/signup`,formData,  { timeout: 30000 });
			} else {
			  response = await axios.post(`${localhost}/api/auth/login`,formData,{ timeout: 30000 });
			} 
		
			const responseData = response.data;
			console.log(responseData);
			// Handle successful login/signup
			auth.login(responseData.userId, responseData.token,responseData.role);		
			navigate('/');
}

		catch (err) {
			
/* 			setError(err.response.data.message);
 */			toast.error(error, {
				position: "bottom-right",
				autoClose: 2000,
			});
			console.log(err);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setformState({
		...formState,
		[name]: value
		});
		// Clear the error for the specific field when user starts typing
		setErrors({
		...errors,
		[name]: ''
		});
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const stateChange = (e) => {
		e.preventDefault();
		setLogin(!isLogin);
	};


	return (<>

						
		<div>
		<div className="form-container">
			<p className="title">{isLogin ? "Login" : "Register"}</p>
			<form className="form" onSubmit={(e) => loginHandler(e)}>
			<div className="input-group">
				<label htmlFor="username" className={errors.username ? 'tooltip' : ''}>
					Username
					{errors.username && <span className="tooltiptext" style={{
						visibility: 'visible',
						color: 'red',
						textAlign: 'center',
						borderRadius: '6px',
						paddingLeft: '5px',
						marginBottom: '20px',
						position: 'absolute',
						zIndex: '1',
						fontWeight: '100'
					}}>{errors.username}</span>}
				</label>

				<input
				type="text"
				name="username"
				id="username"
				onChange={handleInputChange}
				value={formState.username}
				className={errors.username ? 'error' : ''}
				/>
{/* 				{errors.username && <p className="error-message">{errors.username}</p>}
 */}			</div>

			<div className="input-group">
				<label htmlFor="password">Password
				{errors.password && <span className="" style={{
					visibility: 'visible',
						color: 'red',
						textAlign: 'center',
						borderRadius: '6px',
						paddingLeft: '5px',
						marginBottom: '20px',
						position: 'absolute',
						zIndex: '1',
						fontWeight: '100'
				}}>{errors.password}</span>}

				</label>
				<input
				type={showPassword ? "text" : "password"}
				name="password"
				id="password"
				onChange={handleInputChange}
				value={formState.password}
				className={errors.password ? 'error' : ''}
				/>
				<span className="input-icon" style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}} onClick={togglePasswordVisibility}>
					<i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"} style={{cursor: 'pointer'}}></i>
				</span>
				
 
			</div>

			{!isLogin && (
				<div className="input-group">
				<label htmlFor="repeatPassword">Repeat Password {errors.repeatPassword && <span className="tooltiptext" style={{
					visibility: 'visible',
						color: 'red',
						textAlign: 'center',
						borderRadius: '6px',
						paddingLeft: '5px',
						marginBottom: '20px',
						position: 'absolute',
						zIndex: '1',
						fontWeight: '100'
				}}>{errors.repeatPassword}</span>}
				</label>
				<input
					type={showPassword ? "text" : "password"}
					name="repeatPassword"
					id="repeatPassword"
					onChange={handleInputChange}
					value={formState.repeatPassword}
					className={errors.repeatPassword ? 'error' : ''}
				/>
				</div>
			)}

			

			<div className="forgot">
				{isLogin && <a rel="noopener noreferrer" href="#">Forgot Password?</a>}
			</div>

			<button className="sign" type="submit">
				{isLogin ? "Login" : "Register"}
			</button>
			</form>

			<div className="social-message">
			<div className="line"></div>
			<p className="message">Login with social accounts</p>
			<div className="line"></div>
			</div>

			<div className="social-icons">
			{/* Social icons */}
			<button title="Log in with Google" className="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
				</svg>
			</button>
			<button title="Log in with Twitter" className="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
				</svg>
			</button>
			<button title="Log in with GitHub" className="icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
				<path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
				</svg>
			</button>
			</div>
			<p className="signup">
			{isLogin ? "Don't have an account" : "Already have an account"}
			<a rel="noopener noreferrer" onClick={(e) => stateChange(e)} className="">
				{isLogin ? "SignUp" : "Login"}
			</a>
			</p>
		</div>
		</div>
		
		</>
	);
	
	};


	export default Login;
