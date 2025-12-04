import ListingForm from "../components/ListingForm";
import type { ListingInfo } from "../types/ListingInfo";
import { useAuth } from "../auth/useAuth";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const CreateListingPage = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const createListing = async (listingInfo: ListingInfo): Promise<void> => {
        try {
            // set authorisation header if the token exists
            const headers: Record<string, string> = {};
            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }
            headers["Content-Type"] = "application/json";

            const backendPort: number =
                parseInt(import.meta.env.VITE_BACKEND_PORT) || 8080;
            const res: Response = await fetch(
                `http://localhost:${backendPort}/listing`,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify(listingInfo),
                },
            );

            if (!res.ok) {
                throw new Error(
                    `Could not create new listing. Request response status: ${res.status}`,
                );
            }

            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    return (
        <div>
            <NavBar />
            <ListingForm createListing={createListing}></ListingForm>
        </div>
    );
};

export default CreateListingPage;
