import { useEffect, useState } from "react";
import "./App.css";
import type { Listing } from "./types/Listing";
import type { ListingInfo } from "./types/ListingInfo";
import "./components/ListingForm";
import ListingForm from "./components/ListingForm";

const App = () => {
    const [listings, setListings] = useState<Listing[]>([]);

    useEffect(() => {
        const getListings = async (): Promise<void> => {
            try {
                // TODO: learn axios
                const res: Response = await fetch(
                    "http://localhost:8080/listing",
                    {
                        method: "GET",
                    },
                );

                if (!res.ok) {
                    throw new Error(
                        `Listings GET request response status: ${res.status}`,
                    );
                }

                const newListings: Listing[] = await res.json();
                setListings(newListings);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        };

        getListings();
    }, []);

    const createListing = async (listingInfo: ListingInfo): Promise<void> => {
        try {
            const res: Response = await fetch("http://localhost:8080/listing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(listingInfo),
            });

            if (!res.ok) {
                throw new Error(
                    `Could not create new listing. Request response status: ${res.status}`,
                );
            }

            const listing: Listing = await res.json();
            setListings([...listings, listing]);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    const deleteListingById = async (id: number): Promise<void> => {
        try {
            const res: Response = await fetch(
                `http://localhost:8080/listing/${id}`,
                {
                    method: "DELETE",
                },
            );

            if (!res.ok) {
                throw new Error(
                    `Could not delete listing ${id}. Request response status: ${res.status}`,
                );
            }

            setListings(listings.filter((l) => l.id !== id));
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    return (
        <div>
            <ol>
                {listings.map((listing: Listing) => (
                    <li key={listing.id}>
                        <h3>{listing.name}</h3>
                        <p>{listing.description}</p>
                        <p>{listing.price}</p>
                        <button onClick={() => deleteListingById(listing.id)}>
                            Delete Listing
                        </button>
                    </li>
                ))}
            </ol>
            <ListingForm createListing={createListing}></ListingForm>
        </div>
    );
};

export default App;
