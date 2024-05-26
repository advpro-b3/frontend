"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type UpdateCartItemProps = {
  userId: number;
  productId: string;
  name: string;
  quantity: number;
};

export default function UpdateCartItem({ userId, productId, name, quantity }: UpdateCartItemProps) {
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [modal, setModal] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsUpdating(true);

    const requestBody = {
      productId: productId,
      quantity: newQuantity
    };

    await fetch(`https://toytopia-cart-production.up.railway.app/api/cart/update/${userId}`, {
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
              <label className="label font-bold">Quantity</label>
              <input
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Quantity"
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
