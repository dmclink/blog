import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';
import Login from './pages/Login.jsx';

import { PostSummariesProvider } from './contexts/PostSummariesContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
	const [count, setCount] = useState(0);
	const { user, logout } = useAuth();

	return (
		<>
			<header className="header">
				<Link to="/home">
					<h1>dmclink's Blog</h1>
				</Link>
				{user && user.isLoggedIn() ? (
					<div>
						<div>Welcome {user.username}</div>
						<button type="button" onClick={logout}>
							Logout
						</button>
					</div>
				) : (
					<div>
						Not logged in yet. <Link to="/login">Login</Link>
					</div>
				)}
			</header>
			<div className="ticks"></div>
			<section id="spacer"></section>
			<PostSummariesProvider>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/post/:postId" element={<Post />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</PostSummariesProvider>
		</>
	);
}

export default App;
