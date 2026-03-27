import { formatDateString } from '../lib/stringUtils';

function Comment({ comment }) {
	return (
		<article className="comment" key={comment.id}>
			<header>
				<div>{comment.author.username}</div>
				<div>{formatDateString(comment.created_at)}</div>
			</header>
			<p>{comment.content}</p>
		</article>
	);
}

export default Comment;
