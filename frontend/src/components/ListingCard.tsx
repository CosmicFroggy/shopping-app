import type { Listing } from "../types/Listing";

interface Props {
    listing: Listing;
    onDelete: () => void;
}

const ListingCard = ({ listing, onDelete }: Props) => {
    return (
        <li className="listing-card">
            <h3>{listing.name}</h3>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <button onClick={() => onDelete()}>Delete Listing</button>
        </li>
    );
};

export default ListingCard;
