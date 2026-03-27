import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
	const { user, login, error: loginError } = useAuth();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await login(username, password);
		if (!success) {
			alert('incorrect username or password');
		}
	};

	return (
		<section>
			{user && user.isLoggedIn() ? (
				<p>You're already logged in!</p>
			) : (
				<form className="login-form" onSubmit={handleSubmit}>
					<label>
						Username: <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
					</label>
					<label>
						Password:{' '}
						<input type="password" name="current-password" onChange={(e) => setPassword(e.target.value)} />
					</label>
					{loginError && <p className="error-messaage">{loginError}</p>}
					<div className="login-buttons">
						<Link to="/register">Register</Link>
						<button type="submit">Login</button>
					</div>
				</form>
			)}
		</section>
	);
}

export default Login;
