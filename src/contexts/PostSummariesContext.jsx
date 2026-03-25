import axios from 'axios';
import { createContext, useContext, useEffect, useCallback, useState } from 'react';

const PostSummariesContext = createContext([]);

function PostSummariesProvider({ children }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [posts, setPosts] = useState([]);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const resp = await axios.get('http://localhost:5173/api/posts');
			if (resp.status !== 200) {
				throw new Error('fetching posts failed ');
			}

			if (!resp.data.success) {
				throw new Error(resp.error.message);
			}

			setPosts(resp.data.data.posts);
		} catch (err) {
			setError(err.message);
			setPosts([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData, refreshTrigger]);

	const refreshData = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	const contextValue = {
		posts,
		isLoading,
		error,
		refreshData,
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
