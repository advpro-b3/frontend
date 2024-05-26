import DeleteCartItem from "./deleteCartItem";


export const metadata = {
    title: "Shopping Cart",
  };
  
  type CartItem = {
    id: number;
    productId: string;
    name: string;
    quantity: number;
    price: number;
    cartItemId: number;
  };
  
  type ShoppingCartResponse = {
    totalPrice: number;
    message: string;
    cartItems: { [key: string]: CartItem };
    userId: number;
    voucherCode: string | null;
  };
  
  async function getShoppingCart(userId: string) {
    const res = await fetch(`http://localhost:8080/api/cart/data/${userId}`, {
      cache: "no-store",
    });
    return res.json();
  }
  
  export default async function cart() {
    const userId = "2"; // Mock userId, replace with actual userId as needed
    const cartData: ShoppingCartResponse = await getShoppingCart(userId);
    const cartItems: CartItem[] = Object.values(cartData.cartItems);
  
    return (
      <div className="py-10 px-10">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <br></br>
        {/* <div className="py-2">
          <AddProduct />
        </div> */}
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.productId}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <DeleteCartItem
                    userId={cartData.userId}
                    productId={item.productId}
                    title={item.name}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
                <td colSpan={4} className="text-right">
                    Total:
                </td>
                <td>{cartData.totalPrice.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }