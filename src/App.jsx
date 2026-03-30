import { useState } from 'react';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Write from './pages/Write.jsx';

import { PostSummariesProvider } from './contexts/PostSummariesContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
	const { user, logout } = useAuth();
	const [isLoginMenuOpened, setIsLoginMenuOpened] = useState(false);

	const openLoginMenu = () => {
		setIsLoginMenuOpened(true);
	};
	const closeLoginMenu = () => {
		setIsLoginMenuOpened(false);
	};

	return (
		<div className="app-container">
			<header className="header">
				<Link to="/home">
					<h1>dmclink's Blog</h1>
				</Link>
				{user && user.isLoggedIn() ? (
					<div>
						<div>Welcome {user.username}</div>
						{user.canPost && <Link to="/write">Write</Link>}
						<button type="button" onClick={logout}>
							Logout
						</button>

						{user.canComment ? null : <Link to="/register">Register</Link>}
					</div>
				) : isLoginMenuOpened ? (
					<Login />
				) : (
					<div>
						<a href="#" onClick={openLoginMenu}>
							Login
						</a>{' '}
						or <Link to="/register">Register</Link> to comment on posts
					</div>
				)}
			</header>
			<div className="spacer"></div>
			<PostSummariesProvider>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/post/:postId" element={<Post />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" closeLoginMenu={closeLoginMenu} element={<Register />}></Route>
					<Route path="/write" element={<Write />}></Route>
					<Route path="/write/:postId" element={<Write />}></Route>
				</Routes>
			</PostSummariesProvider>
		</div>
	);
}

export default App;
