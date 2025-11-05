import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const [listings, setListings] = useState([]);

	useEffect(() => {
		const getListings = async () => {
			try {
				const res = await fetch("http://localhost:8080/listing", {
					method: "GET"
				});

				if (!res.ok) {
					throw new Error(`Listings GET request response status: ${res.status}`);
				}

				const result = await res.json();
				console.log(result);
			} catch (error) {
				console.error(error.message);
			}
		};

		getListings();

	}, []);

	return (
		<div>

		</div>
	);
	}

export default App;
