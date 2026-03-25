import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { usePostSummariesContext } from '../contexts/PostSummariesContext';

function Home(props) {
	const context = usePostSummariesContext();
	const isLoading = context.isLoading;
	const posts = context.posts;
	const postsError = context.error;

	return (
		<section>
			<h1>hello hoooome page</h1>
			{!isLoading &&
				posts &&
				(posts.size > 0 ? (
					posts.entries().map(([id, post]) => (
						<Link key={id} to={'/post/' + id}>
							<div>
								<p>{post.title || 'Entry #' + id}</p>
								<p>{post.created_at}</p>
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
