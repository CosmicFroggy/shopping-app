import type { Listing } from "../types/Listing";
import { useAuth } from "../auth/useAuth";

interface Props {
    listing: Listing;
    onDelete: () => void;
}

const ListingCard = ({ listing, onDelete }: Props) => {
    const { authInfo } = useAuth();

    return (
        <li data-testid="listingCard" className="listing-card relative">
            <h3 className="listing-card-title">{listing.name}</h3>
            <p>{listing.description}</p>
            <p className="italic">£{listing.price}</p>
            <button
                hidden={authInfo?.role !== "ADMIN"}
                className="shadow-md rounded-md bg-white border border-red-500 p-0.5"
                onClick={() => onDelete()}
            >
                Delete Listing
            </button>
        </li>
    );
};

export default ListingCard;
