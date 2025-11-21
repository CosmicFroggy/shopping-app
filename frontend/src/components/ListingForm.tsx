import { useState } from "react";
import type { ListingInfo } from "../types/ListingInfo";

type Props = {
    createListing: (listingInfo: ListingInfo) => void;
};

const ListingForm = ({ createListing }: Props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const listingInfo: ListingInfo = {
            name: name,
            description: description,
            price: parseFloat(price),
        };
        createListing(listingInfo);
        setName("");
        setDescription("");
        setPrice("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setName(e.target.value)
                }
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setDescription(e.target.value)
                }
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                    setPrice(e.target.value)
                }
            />
            <button type="submit">Create Listing</button>
        </form>
    );
};

export default ListingForm;
