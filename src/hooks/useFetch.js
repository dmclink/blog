import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function useFetch(endpoint) {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	// these checks just here in case i forget how my env base url ends
	if (BASE_URL.endsWith('/') && endpoint.startsWith('/')) {
		endpoint = endpoint.slice(1);
	}
	if (!BASE_URL.endsWith('/') && !endpoint.startsWith('/')) {
		endpoint = '/' + endpoint;
	}

	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const url = BASE_URL + endpoint;
			const resp = await axios.get(url);
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
