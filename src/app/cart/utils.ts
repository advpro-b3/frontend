export type CartItem = {
    id: number;
    productId: string;
    name: string;
    quantity: number;
    price: number;
    cartItemId: number;
  };
  
  export type ShoppingCartResponse = {
    totalPrice: number;
    message: string;
    cartItems: { [key: string]: CartItem };
    userId: number;
    voucherCode: string | null;
  };
  
  export async function getShoppingCart(userId: string, voucherCode?: string): Promise<ShoppingCartResponse> {
    let url = `http://localhost:8080/api/cart/data/${userId}`;
    if (voucherCode) {
      url += `?voucherCode=${voucherCode}`;
    }
    const res = await fetch(url, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error('Failed to fetch cart data');
    }
    return res.json();
  }
  