"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ApplyVoucherProps = {
  userId: string;
};

export default function ApplyVoucher({ userId }: ApplyVoucherProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleApplyVoucher() {
    setIsApplying(true);
    setMessage("");

    const res = await fetch(`https://toytopia-cart-production.up.railway.app/api/cart/data/${userId}?voucherCode=${voucherCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const cartData = await res.json();
      setMessage("Voucher applied successfully!");
      
      router.push(`/checkout?totalPrice=${cartData.totalPrice}&voucherCode=${cartData.voucherCode}
      &cartItems=${encodeURIComponent(JSON.stringify(Object.values(cartData.cartItems)))}
      &cartId=${cartData.userId}`);
    } else {
      setMessage("Failed to apply voucher. Please try again.");
    }

    setIsApplying(false);
  }

  return (
    <div className="py-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Enter voucher code"
        />
        <button
          className={`btn btn-primary ${isApplying ? "loading" : ""}`}
          onClick={handleApplyVoucher}
          disabled={isApplying}
        >
          Apply
        </button>
      </div>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
