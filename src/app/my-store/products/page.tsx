import UpdateProduct from "./updateProduct";
import DeleteProduct from "./deleteProduct";

export const metadata = {
  title: "My Products",
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  availability: string;
};

async function getAllProducts(userId: string, voucherCode?: string) {
  let url = `http://35.232.64.117/api/product-service/all-products`;
  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error('Failed to fetch cart data');
  }
  return res.json();
}

export default async function products() {
  const userId = "2"; // Mock userId, replace with actual userId as needed
  const allProducts: Product[] = await getAllProducts(userId);
  return (
    <div className="py-10 px-10">
      <h1 className="text-2xl font-bold">My Products</h1>
      <br />
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Discount</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.stock}</td>
              <td>{item.discount}</td>
              <td>{item.availability}</td>
              <td>
                <div className="flex space-x-2">
                  <UpdateProduct
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    stock={item.stock}
                    discount={item.discount}
                    availability={item.availability}
                    />
                  <DeleteProduct
                    id={item.id}
                    name={item.name}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right">
              Total:
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex space-x-4">
      <a href="/my-store/" className="bg-blue-500 text-white px-4 py-2 rounded">
        Back to My Store
      </a>
    </div>
    </div>
  );
}
