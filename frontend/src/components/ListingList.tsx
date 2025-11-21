import type { Listing } from "../types/Listing";
import ListingCard from "./ListingCard";

interface Props {
    listings: Listing[];
    deleteListingByID: (id: number) => Promise<void>;
}

const ListingList = ({ listings, deleteListingByID }: Props) => {
    return (
        <ol>
            {listings.map((listing: Listing) => (
                <ListingCard
                    listing={listing}
                    onDelete={() => deleteListingByID(listing.id)}
                    key={listing.id}
                />
            ))}
        </ol>
    );
};

export default ListingList;
