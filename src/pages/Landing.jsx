import { usePostSummariesContext } from '../contexts/PostSummariesContext.jsx';

function Landing(props) {
	const context = usePostSummariesContext();

	const isLoading = context.isLoading;
	const posts = context.posts;
	const postsError = context.error;
	return (
		<section>
			<h1>hello laanding page</h1>
			{isLoading && <p>fetching posts...</p>}
			{!isLoading && posts.length === 0 && <p>No posts yet! Wait until I publish some.</p>}
			{!isLoading &&
				posts.length > 0 &&
				posts.map((post) => (
					<a href={'/post/' + post.id}>
						<div key={post.id}>
							<p>{post.title || 'Entry #' + post.id}</p>
							<p>{post.created_at}</p>
						</div>
					</a>
				))}
		</section>
	);
}

export default Landing;
