import { useEffect, useState } from 'react';
import axios from 'axios';

function Home(props) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5173/api/posts').then((resp) => {
			console.log(resp);
		});
	}, []);

	return (
		<section>
			<h1>hello hoooome page</h1>
		</section>
	);
}

export default Home;
