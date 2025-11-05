import { useState } from "react";

const ListingForm = ({createListing}) => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        createListing({
            name: name,
            description: description,
            price: parseFloat(price)
        });
        setName("");
        setDescription("");
        setPrice("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="number" name="price" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            <button type="submit">Create Listing</button>
        </form>
    );
};

export default ListingForm;