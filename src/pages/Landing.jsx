import { usePostSummariesContext } from '../contexts/PostSummariesContext.jsx';
import { Link } from 'react-router-dom';

function Landing(props) {
	const context = usePostSummariesContext();
	const isLoading = context.isLoading;
	const posts = context.posts;
	const postsError = context.error;

	return (
		<section>
			<h1>hello laanding page</h1>
			<p>
				<Link to="/home">Go to home</Link>
			</p>
		</section>
	);
}

export default Landing;
