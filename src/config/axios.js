import axios from 'axios';

const BASE_URL = 'https://personal-blog-server-production-de35.up.railway.app/api';

console.log('BASE_URL:', BASE_URL);
const client = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default client;
