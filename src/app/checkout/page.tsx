"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

type CartItem = {
  id: number;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  cartItemId: number;
};

const CheckoutContent = () => {
  const searchParams = useSearchParams();

  // Retrieve values from search params
  const totalPrice = searchParams.get('totalPrice');
  const voucherCode = searchParams.get('voucherCode');
  const cartItemsString = searchParams.get('cartItems');
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartItemsString) {
      try {
        const parsedItems = JSON.parse(decodeURIComponent(cartItemsString));
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        }
      } catch (error) {
        console.error("Failed to parse cart items:", error);
      }
    }
  }, [cartItemsString]);

  return (
    <div className="py-10 px-10">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p>Your voucher has been successfully applied. Proceed to checkout.</p>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.productId}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right">Total:</td>
            <td>{totalPrice}</td>
          </tr>
          <tr>
            <td colSpan={4} className="text-right">Voucher Code:</td>
            <td>{voucherCode}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const Checkout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;
