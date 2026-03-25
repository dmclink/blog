import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.PERSONAL_BLOG_BASE_URL;

function useFetch(endpoint) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const resp = await axios.get(BASE_URL + endpoint);
				if (resp.status !== 200) {
					throw new Error('Something went wrong fetching data');
				}

				if (resp.data.success === false) {
					throw new Error('Your inputs are probably wrong, try again');
				}

				console.log(resp);
				setData(resp.data.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [endpoint]);
}

export { useFetch };
