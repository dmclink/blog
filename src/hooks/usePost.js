import { useState, useCallback } from 'react';
import axios from '../config/axios.js';

function usePost(endpoint) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const postData = useCallback(
		async (requestBody) => {
			setIsLoading(true);
			setError(null);
			setData(null);
			try {
				const resp = await axios.post(endpoint, requestBody);
				console.log(resp);
				console.log(resp.status);
				console.log(resp.data);
				console.log(resp.data.success);
				if (resp.status !== 200) {
					throw new Error('Something went wrong posting data');
				}

				if (resp.data.success === false) {
					throw new Error('Your inputs are probably wrong, try again');
				}

				const respData = resp.data;
				setData(respData);
				return respData;
			} catch (err) {
				console.error(err);
				setError(err.message);
				return null;
			} finally {
				setIsLoading(false);
			}
		},
		[endpoint],
	);

	return { postData, data, isLoading, error };
}

export default usePost;
