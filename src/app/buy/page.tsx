// import AddProduct from "./addProduct";
// import DeleteProduct from "./deleteProduct";
// import UpdateProduct from "./updateProduct";

export const metadata = {
  title: "Product List",
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  discount: number;
  availability: string;
  valid: boolean;
};

async function getProducts() {
  const res = await fetch("http://35.232.64.117/api/product-service/all-products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export default async function ProductList() {
  const products: Product[] = await getProducts();
  return (
    <div className="py-10 px-10">
      <h1 className="text-2xl font-bold">Katalog Produk</h1>
      <br />
      {/* <div className="py-2">
        <AddProduct />
      </div> */}
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
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.discount}</td>
              <td>{product.availability}</td>
              {/* <td className="flex">
                <div className="mr-1">
                  <UpdateProduct {...product} />
                </div>
                <DeleteProduct {...product} />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
