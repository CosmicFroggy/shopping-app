import { useEffect, useState } from "react";
import type { Listing } from "../types/Listing";
import { useAuth } from "../auth/useAuth";
import ListingList from "../components/ListingList";
import NavBar from "../components/NavBar";

const ListingsPage = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const { token } = useAuth();

    const [sorting, setSorting] = useState<string>("");

    useEffect(() => {
        const getListings = async (): Promise<void> => {
            try {
                // set authorisation header if the token exists
                const headers: Record<string, string> = {};
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                // TODO: learn axios
                const backendPort: number =
                    parseInt(import.meta.env.VITE_BACKEND_PORT) || 8080;
                const res: Response = await fetch(
                    `http://localhost:${backendPort}/listing?${sorting}`,
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

                // TODO: FIGURE OUT THE TYPE
                const data = await res.json();
                setListings(data._embedded.listingList);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        };

        getListings();
    }, [sorting]);

    const deleteListingById = async (id: number): Promise<void> => {
        try {
            // set authorisation header if the token exists
            const headers: Record<string, string> = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            const backendPort: number =
                parseInt(import.meta.env.VITE_BACKEND_PORT) || 8080;
            const res: Response = await fetch(
                `http://localhost:${backendPort}/listing/${id}`,
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
            <form>
                <label htmlFor="sorting">Sort by:</label>
                <select
                    value={sorting}
                    onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>,
                    ): void => setSorting(event.target.value)}
                    name="sorting"
                    id="sorting"
                >
                    <option value="">None</option>
                    <option value="sort=price,desc">Price: high to low</option>
                    <option value="sort=price,asc">Price: low to high</option>
                    <option value="sort=name,asc">Name: A to Z</option>
                    <option value="sort=name,desc">Name: Z to A</option>
                </select>
            </form>
        </div>
    );
};

export default ListingsPage;
