import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Post(props) {
	const [post, setPost] = useState({});
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { postId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setFetchError(null);
			try {
				const resp = await axios.get('http://localhost:5173/api/posts/view/' + postId);
				if (resp.status !== 200) {
					throw new Error('Something went wrong fetching data');
				}

				if (resp.data.success === false) {
					throw new Error('Your inputs are probably wrong, try again');
				}

				console.log(resp);
				setPost(resp.data.data);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [postId]);

	return <></>;
}

export default Post;
