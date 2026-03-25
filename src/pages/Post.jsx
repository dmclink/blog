import { useParams, Link } from 'react-router-dom';
import { usePostSummariesContext } from '../contexts/PostSummariesContext.jsx';

import useFetch from '../hooks/useFetch.js';

function Post(props) {
	const context = usePostSummariesContext();
	const { postId } = useParams();
	const postHeader = context.posts && context.posts.get(Number(postId));

	const endpoint = '/posts/view/' + postId;
	const { data: postResp, isLoading, error, refreshData: refreshPost } = useFetch(endpoint);
	const post = postResp && postResp.post;

	return (
		<div>
			{postHeader && (
				<header>
					<h1>{postHeader.title}</h1>
					<p>Created: {postHeader.created_at}</p>
				</header>
			)}
			<div className="ticks"></div>
			<section id="spacer"></section>
			{post && (
				<div>
					<p>Last Updated: {post.updated_at}</p>
					<p>{post.content}</p>
					<p>{post.comments}</p>
				</div>
			)}
			{isLoading && <p>fetching posts...</p>}
			{error && <p className="error-message">{error}</p>}
			<footer>
				<p>
					Back to view all <Link to="/home">posts</Link>
				</p>
			</footer>
		</div>
	);
}

export default Post;
