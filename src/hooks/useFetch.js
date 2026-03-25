import { useState, useEffect, useCallback } from 'react';
import axios from '../config/axios.js';

function useFetch(endpoint) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const resp = await axios.get(endpoint);
			if (resp.status !== 200) {
				throw new Error('Something went wrong fetching data');
			}

			if (resp.data.success === false) {
				throw new Error('Your inputs are probably wrong, try again');
			}

			const respData = resp.data && resp.data.data;

			setData(respData);
		} catch (err) {
			console.error(err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	}, [endpoint]);

	useEffect(() => {
		fetchData();
	}, [endpoint, refreshTrigger, fetchData]);

	const refreshData = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return { data, isLoading, error, refreshData };
}

export default useFetch;
