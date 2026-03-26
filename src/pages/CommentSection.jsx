import { formatDateString } from '../lib/stringUtils';

import CommentForm from './CommentForm.jsx';
import Comment from './Comment.jsx';

function CommentSection({ postId, comments, refreshPost }) {
	return (
		<section>
			{comments && comments.length > 0 ? (
				<div className="comments-list">
					{comments.map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
				</div>
			) : (
				<div>No comments yet, why don't you add some?</div>
			)}
			<CommentForm postId={postId} refreshPost={refreshPost} />
		</section>
	);
}

export default CommentSection;
