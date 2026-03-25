import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx';

import { PostSummariesProvider } from './contexts/PostSummariesContext.jsx';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<section id="center">
				<div className="hero">
					<img src={heroImg} className="base" width="170" height="179" alt="" />
					<img src={reactLogo} className="framework" alt="React logo" />
					<img src={viteLogo} className="vite" alt="Vite logo" />
				</div>
				<div>
					<h1>Get started</h1>
					<p>
						Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
					</p>
				</div>
				<button className="counter" onClick={() => setCount((count) => count + 1)}>
					Count is {count}
				</button>
				<p>hello</p>
			</section>

			<PostSummariesProvider>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/post/:postId" element={<Post />}></Route>
				</Routes>
			</PostSummariesProvider>

			<div className="ticks"></div>

			<div className="ticks"></div>
			<section id="spacer"></section>
		</>
	);
}

export default App;
