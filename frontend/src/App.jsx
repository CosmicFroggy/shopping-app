import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import "./components/ListingForm"
import ListingForm from './components/ListingForm';

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
				setListings(result);
			} catch (error) {
				console.error(error.message);
			}
		};

		getListings();
	}, []);

	const createListing = async (listing) => {
		try {
			const res = await fetch("http://localhost:8080/listing", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(listing)
			});

			if (!res.ok) {
				throw new Error(`Could not create new listing. Request response status: ${res.status}`);
			}

			const result = await res.json();
			console.log(result);
		} catch (error) {
			console.error(error.message);
		}
	};
 
	return (
		<div>
			<ol>
				{
					listings.map((listing) => (
						<li key={listing.id}>{listing.name}</li>
					))
				}
			</ol>
			<ListingForm createListing={createListing}></ListingForm>
		</div>
	);
	}

export default App;
