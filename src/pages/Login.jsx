import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login(props) {
	const { user, login, error: loginError } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await login(username, password);
		console.log(success);
		if (success) {
			navigate('/home');
		}
	};

	return (
		<section>
			{user && user.isLoggedIn() ? (
				<p>You're already logged in!</p>
			) : (
				<form onSubmit={handleSubmit}>
					<label>
						Username:
						<input type="text" name="username" onChange={(e) => setUsername(e.target.value)} />
					</label>
					<label>
						Password:
						<input type="password" name="current-password" onChange={(e) => setPassword(e.target.value)} />
					</label>
					{loginError && <p className="error-messaage">{loginError}</p>}
					<button type="submit">Login</button>
				</form>
			)}

			<p>
				Back to view all <Link to="/home">posts</Link>
			</p>
		</section>
	);
}

export default Login;
