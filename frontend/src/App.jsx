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
			setListings([...listings, result]);
		} catch (error) {
			console.error(error.message);
		}
	};

	const deleteListingById = async (id) => {
		try {
			const res = await fetch(`http://localhost:8080/listing/${id}`, {
				method: "DELETE"
			});

			if (!res.ok) {
				throw new Error(`Could not delete listing ${id}. Request response status: ${res.status}`);
			}

			setListings(listings.filter((l) => l.id !== id));
		} catch (error) {
			console.error(error.message);
		}
	};


 
	return (
		<div>
			<ol>
				{
					listings.map((listing) => (
						<li key={listing.id}>
							<h3>{listing.name}</h3>
							<p>{listing.description}</p>
							<p>{listing.price}</p>
							<button onClick={() => deleteListingById(listing.id)}>Delete Listing</button>
						</li>
					))
				}
			</ol>
			<ListingForm createListing={createListing}></ListingForm>
		</div>
	);
	}

export default App;
