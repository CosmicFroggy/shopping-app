import type { Listing } from "../types/Listing";

interface Props {
    listing: Listing;
    onDelete: () => void;
}

const ListingCard = ({ listing, onDelete }: Props) => {
    return (
        <li className="listing-card">
            <h3 className="listing-card-title">{listing.name}</h3>
            <p>{listing.description}</p>
            <p className="italic">£{listing.price}</p>
            <button className="bg-red-500 p-0.5" onClick={() => onDelete()}>
                Delete Listing
            </button>
        </li>
    );
};

export default ListingCard;
