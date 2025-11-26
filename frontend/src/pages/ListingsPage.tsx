import { useEffect, useState } from "react";
import type { Listing } from "../types/Listing";
import { useAuth } from "../auth/useAuth";
import ListingList from "../components/ListingList";
import NavBar from "../components/NavBar";

const ListingsPage = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const { token } = useAuth();

    useEffect(() => {
        const getListings = async (): Promise<void> => {
            try {
                // set authorisation header if the token exists
                const headers: Record<string, string> = {};
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                // TODO: learn axios
                const res: Response = await fetch(
                    "http://localhost:8080/listing",
                    {
                        method: "GET",
                        headers,
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

    const deleteListingById = async (id: number): Promise<void> => {
        try {
            // set authorisation header if the token exists
            const headers: Record<string, string> = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const res: Response = await fetch(
                `http://localhost:8080/listing/${id}`,
                {
                    method: "DELETE",
                    headers,
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
            <NavBar />
            <ListingList
                listings={listings}
                deleteListingByID={deleteListingById}
            />
        </div>
    );
};

export default ListingsPage;
