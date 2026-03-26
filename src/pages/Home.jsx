import { Link } from 'react-router-dom';

import { usePostSummariesContext } from '../contexts/PostSummariesContext';
import { formatDateString } from '../lib/stringUtils';

function Home() {
	const context = usePostSummariesContext();
	const isLoading = context.isLoading;
	const posts = context.posts;
	const postsError = context.error;

	return (
		<section>
			<h1>Posts</h1>
			{!isLoading &&
				posts &&
				(posts.size > 0 ? (
					Array.from(posts).map(([id, post]) => (
						<Link key={id} to={'/post/' + id}>
							<div className="post-link">
								<p>{post.title || 'Entry #' + id}</p>
								<p>{formatDateString(post.created_at)}</p>
							</div>
						</Link>
					))
				) : (
					<p>No posts yet! Wait until I publish some.</p>
				))}
			{isLoading && <p>fetching posts...</p>}
			{postsError && <p className="error-message">{postsError}</p>}
		</section>
	);
}

export default Home;
