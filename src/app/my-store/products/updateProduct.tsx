"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type UpdateProductProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  availability: string;
};

export default function UpdateProduct({ id, name, description, price, stock, discount ,availability}: UpdateProductProps) {
  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newStock, setNewStock] = useState(stock);
  const [newAvailability, setNewAvailability] = useState(availability);
  const [newDiscount, setNewDiscount] = useState(discount);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsUpdating(true);

    const requestBody = {
      id: id,
      name: newName,
      description: newDescription,
      price: newPrice,
      stock: newStock,
      discount: newDiscount,
      availability: newAvailability
    };

    await fetch(`http://localhost:8081/api/product-service/update-product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    setIsUpdating(false);

    // Redirect to another page or refresh the current page as needed
    router.refresh();
    setModal(false);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={() => setModal(true)}>
        Edit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={() => setModal(!modal)}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Name</label>
              <input
                type="string"
                value={name}
                onChange={(e) => setNewName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Name"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Description</label>
              <input
                type="string"
                value={description}
                onChange={(e) => setNewDescription(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setNewPrice(parseInt(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Price"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Discount</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setNewDiscount(parseInt(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Discount"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setNewStock(parseInt(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Stock"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Availability</label>
              <input
                type="string"
                value={availability}
                onChange={(e) => setNewAvailability(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Availability"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={() => setModal(false)}>
                Close
              </button>
              {!isUpdating ? (
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
