import { useAuth } from '../contexts/AuthContext';
import { useState, useRef } from 'react';
import usePost from '../hooks/usePost';
import Login from './Login';

function CommentForm(props) {
	const [isWritingComment, setIsWritingComment] = useState(false);
	const [postError, setPostError] = useState(null);

	const commentTextAreaRef = useRef(null);

	const authContext = useAuth();
	const user = authContext.user;

	const canComment = user && user.canComment;

	const { postData } = usePost('/comments/create');

	const toggleIsWriting = () => {
		setIsWritingComment((prev) => !prev);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			await postData({ post_id: props.postId, content: commentTextAreaRef.current.value });
			props.refreshPost();
			toggleIsWriting();
			setPostError(null);
		} catch (err) {
			console.error(err);
			setPostError(err.message);
		}
	};

	return (
		<>
			{canComment ? (
				isWritingComment ? (
					<>
						<form>
							<textarea ref={commentTextAreaRef} cols="60" rows="5"></textarea>
							<button type="button" onClick={handleClick}>
								Add Comment
							</button>
						</form>
						{postError && <p className="error-message">{postError}</p>}
					</>
				) : (
					<button onClick={toggleIsWriting}>Comment</button>
				)
			) : (
				<p>must be logged in to comment</p>
			)}
		</>
	);
}

export default CommentForm;
