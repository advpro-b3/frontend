"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AddItemToCartProps = {
  productId: string;
  productTitle: string;
};

export default function AddItemToCart({ productId, productTitle }: AddItemToCartProps) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    const userId = "2"; // Hardcoded for now

    const requestBody = {
      productId: productId,
    };

    await fetch(`https://toytopia-cart-production.up.railway.app//api/cart/addItem/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Add To Cart
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add {productTitle} to Cart?</h3>
          <form onSubmit={handleSubmit}>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Yes
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

