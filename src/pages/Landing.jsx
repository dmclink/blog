import { Link } from 'react-router-dom';

function Landing() {
	return (
		<section className="landing-section">
			<p>This is a personal blog site made and written by dmclink.</p>
			<p>
				This was built as a practice and demo of React and Node.js. And at the time I'm writing this landing
				page, I'm not sure if I will actually maintain it or not. If there are any posts, topics will include
				computer programming. Discussing the struggles I find as I reinvent many wheels.
			</p>
			<p>
				Currently getting a shallow depth of knowledge of a number of JavaScript frameworks and libraries. I
				miss coding in Go, hopefully I can get back to it soon.
			</p>
			<p>
				Go to read <Link to="/home">all posts</Link>
			</p>
		</section>
	);
}

export default Landing;
