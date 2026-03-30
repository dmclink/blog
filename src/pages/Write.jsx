import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import usePost from '../hooks/usePost';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { usePostSummariesContext } from '../contexts/PostSummariesContext';

function Write(props) {
	const { postId: idString } = useParams();
	const postId = Number(idString);

	//TODO: useEffect not resetting states and input fields when going back to the write new post mode
	//also need a header for write new postm ode

	const { data: draftsData, refreshData: refreshDrafts } = useFetch('/posts/drafts');
	const drafts =
		draftsData &&
		draftsData.drafts.reduce((map, draft) => {
			map.set(draft.id, draft);
			return map;
		}, new Map());
	const findDraft = (postId) => {
		if (!drafts) return undefined;
		const id = Number(postId);
		const draft = drafts.get(id);
		return draft;
	};

	const { refreshPosts, posts } = usePostSummariesContext();
	const findPost = (postId) => {
		if (!posts) return undefined;
		const id = Number(postId);
		const post = posts.get(id);
		return post;
	};

	const draft = findDraft(postId);
	const post = findPost(postId);
	const curr = draft || post;

	const [title, setTitle] = useState((curr && curr.title) || '');
	const [description, setDescription] = useState((curr && curr.description) || '');
	const [content, setContent] = useState((curr && curr.content) || '');

	const { postData: postDraftPublish } = usePost('/posts/publish-draft');
	const { postData: postCreate } = usePost('/posts/create?publish=true');
	const { postData: postSave } = usePost('/posts/create');
	const { postData: postEdit } = usePost('/posts/edit');
	const { user } = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		const updateStates = async () => {
			if (!curr) {
				setContent('');
				setTitle('');
				setDescription('');
			} else {
				setContent(curr.content);
				setTitle(curr.title);
				setDescription(curr.description);
			}
		};
		updateStates();
	}, [postId, curr]);

	if (!user || !user.canPost) {
		return <Navigate to="/home" replace />;
	}

	async function handlePublishPost(e) {
		e.preventDefault();
		try {
			await postCreate({ title, description, content });
			refreshPosts();
			setTitle('');
			setDescription('');
			setContent('');
		} catch (err) {
			console.error(err);
		}
	}

	async function handlePublishDraft(e) {
		e.preventDefault();
		try {
			const draft = findDraft(postId);
			if (!draft) {
				console.error('attempting to publish a draft that doesnt exist, how did we get here? id:', postId);
				return;
			}

			// need to save the changes first
			if (draft.content !== content || draft.title !== title || draft.description !== description) {
				await postEdit({ post_id: postId, title, description, content });
			}

			await postDraftPublish({ post_id: postId });

			refreshDrafts();
			refreshPosts();
			setTitle('');
			setDescription('');
			setContent('');
		} catch (err) {
			console.error(err);
		}
	}

	async function handleEdit(e) {
		e.preventDefault();
		try {
			if (!postId) {
				console.error('called handle edit when no post id:', postId);
				return;
			}
			await postEdit({ post_id: postId, title, description, content });
			if (draft) {
				refreshDrafts();
			} else {
				refreshPosts();
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function handleSave(e) {
		e.preventDefault();
		const resp = await postSave({ title, description, content });
		console.log(resp);
		navigate('/write/' + resp.post.id);
	}

	return (
		<section className="write-section">
			{!draft && !post && <h2>New Post</h2>}
			{draft && <h2>Editing Draft "{draft.title}"</h2>}
			{post && <h2>Editing Published Post "{post.title}"</h2>}

			<form className="write-form">
				<label>
					Title:
					<input
						type="text"
						name="title"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						value={title || ''}
					/>
				</label>
				<label>
					Description/Summary:
					<textarea
						name="description"
						className="write-description-field"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						value={description || ''}
					></textarea>
				</label>
				<label className="write-content-label">
					Body Content:
					<textarea
						name="content"
						className="write-content-field"
						required
						onChange={(e) => {
							setContent(e.target.value);
						}}
						value={content || ''}
					></textarea>
				</label>

				{findDraft(postId) && (
					<>
						<button type="button" onClick={handlePublishDraft}>
							Publish Draft
						</button>
						<button type="button" onClick={handleEdit}>
							Save Draft
						</button>
					</>
				)}

				{findPost(postId) && (
					<>
						<button type="button" onClick={handleEdit}>
							Publish Edits
						</button>
					</>
				)}

				{!findPost(postId) && !findDraft(postId) && (
					<>
						<button type="button" onClick={handlePublishPost}>
							Publish Post
						</button>
						<button type="button" onClick={handleSave}>
							Save Draft
						</button>
					</>
				)}
			</form>
			<h2>Saved Drafts</h2>
			{drafts && (
				<ul>
					{Array.from(drafts.entries()).map(([id, draft]) => (
						<li key={id}>
							<Link to={'/write/' + id}>{draft.title || 'Untitled Draft'}</Link>
						</li>
					))}
				</ul>
			)}
			{(!drafts || drafts.length === 0) && <p>No saved drafts yet...</p>}
			<h2>Published Posts</h2>
			{posts && (
				<ul>
					{Array.from(posts.entries()).map(([id, post]) => (
						<li key={id}>
							<Link to={'/write/' + id}>{post.title}</Link>
						</li>
					))}
				</ul>
			)}
			{(!posts || posts.length === 0) && <p>No saved posts yet...</p>}
		</section>
	);
}

export default Write;
