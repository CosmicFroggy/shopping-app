import { useState } from "react";

type props = {
    createListing: (listing: {
        name: string;
        description: string;
        price: number;
    }) => void;
};

const ListingForm = ({ createListing }: props) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        createListing({
            name: name,
            description: description,
            price: parseFloat(price),
        });
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
