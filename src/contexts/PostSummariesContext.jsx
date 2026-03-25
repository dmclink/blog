import { createContext, useContext, useEffect, useCallback, useState } from 'react';

import useFetch from '../hooks/useFetch.js';

const PostSummariesContext = createContext([]);

function PostSummariesProvider({ children }) {
	const { isLoading, error, data: postsData, refreshData: refreshPosts } = useFetch('posts');

	const posts =
		postsData &&
		postsData.posts.reduce((map, post) => {
			map.set(post.id, post);
			return map;
		}, new Map());

	const contextValue = {
		posts,
		isLoading,
		error,
		refreshPosts,
	};

	return <PostSummariesContext.Provider value={contextValue}>{children}</PostSummariesContext.Provider>;
}

function usePostSummariesContext() {
	const context = useContext(PostSummariesContext);
	if (context === undefined) {
		throw new Error('usePostSummariesContext must be used within a PostSummariesProvider');
	}
	return context;
}

export { PostSummariesContext, PostSummariesProvider, usePostSummariesContext };
