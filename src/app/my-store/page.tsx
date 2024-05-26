export const metadata = {
  title: "My Store",
};

export default function myStore() {
  return (
    <div className="py-10 px-10">
      <h1 className="text-2xl font-bold">My Store</h1>
      <br />
      <div className="flex space-x-4">
        <a href="/my-store/products" className="bg-blue-500 text-white px-4 py-2 rounded">
          My Products
        </a>
      </div>
    </div>
  );
}
