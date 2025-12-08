import { useEffect, useState } from "react";
import type { Listing } from "../types/Listing";
import { useAuth } from "../auth/useAuth";
import ListingList from "../components/ListingList";
import NavBar from "../components/NavBar";

const ListingsPage = () => {
    const [listings, setListings] = useState<Listing[]>([]);
    const { token } = useAuth();

    const [sorting, setSorting] = useState<string>("");
    const [prevPage, setPrevPage] = useState<string | undefined>(undefined);
    const [nextPage, setNextPage] = useState<string | undefined>(undefined);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const getListings = async (url: string): Promise<void> => {
        try {
            // set authorisation header if the token exists
            const headers: Record<string, string> = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            // TODO: learn axios
            const res: Response = await fetch(url, {
                method: "GET",
                headers,
            });

            if (!res.ok) {
                throw new Error(
                    `Listings GET request response status: ${res.status}`,
                );
            }

            // TODO: FIGURE OUT THE TYPE
            const data = await res.json();
            setListings(data._embedded.listingList);
            setPrevPage(data._links.prev?.href);
            setNextPage(data._links.next?.href);
            setPageNumber(parseInt(data.page.number) + 1);
            setTotalPages(parseInt(data.page.totalPages));
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    useEffect(() => {
        const backendPort: number =
            parseInt(import.meta.env.VITE_BACKEND_PORT) || 8080;
        getListings(`http://localhost:${backendPort}/listing?${sorting}`);
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
            {prevPage && (
                <button
                    onClick={() => {
                        getListings(prevPage);
                    }}
                    className="border-2 border-black p-1 ml-0.5 mr-0.5"
                >
                    Previous
                </button>
            )}
            {nextPage && (
                <button
                    onClick={() => {
                        getListings(nextPage);
                    }}
                    className="border-2 border-black p-1 ml-0.5 mr-0.5"
                >
                    Next
                </button>
            )}
            <p>
                Page {pageNumber} of {totalPages}.
            </p>
        </div>
    );
};

export default ListingsPage;
