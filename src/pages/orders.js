import Header from "../components/Header";

const Orders = () => {
  // We are importing the session to know if the user is logged in or not

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
      </main>
    </div>
  );
};

export default Orders;
