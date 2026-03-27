import { useParams, Link } from 'react-router-dom';
import { usePostSummariesContext } from '../contexts/PostSummariesContext.jsx';

import { formatDateString } from '../lib/stringUtils.js';

import useFetch from '../hooks/useFetch.js';

import CommentSection from './CommentSection.jsx';

function Post() {
	const { postId } = useParams();
	const postsContext = usePostSummariesContext();
	const postHeader = postsContext.posts && postsContext.posts.get(Number(postId));

	const endpoint = '/posts/view/' + postId;
	const { data: postResp, isLoading, error, refreshData: refreshPost } = useFetch(endpoint);
	const post = postResp && postResp.post;

	return (
		<div className="post">
			{postHeader && (
				<header className="post-header">
					<h1>{postHeader.title}</h1>
					<p>Created: {formatDateString(postHeader.created_at)}</p>
					{post && <p>Updated: {formatDateString(post.updated_at)}</p>}
				</header>
			)}
			{post && (
				<section className="post-content-section">
					<p>{post.content}</p>
				</section>
			)}
			<CommentSection comments={post && post.comments} postId={postId} refreshPost={refreshPost} />
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
