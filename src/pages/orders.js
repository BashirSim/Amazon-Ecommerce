import { getSession, useSession } from "next-auth/client";
import Header from "../components/Header";
import Order from "../components/Order";
import moment from "moment";
import db from "../../firebase";

// We're passing orders as an argument to do a Server Side Rendering(SSR)
const Orders = ({ orders }) => {
  // We are importing the session to know if the user is logged in or not
  const [session] = useSession();

  console.log(orders);

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, timestamp, images }) => (
              <Order
                key={id}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                timestamp={timestamp}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

// Anything that uses getServerSidePrpos is node.JS
export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // Get the users logged in credentials...
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // Firebase db
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      //   When you have firebase timestamp you can send it by using stringfy
      // but you loose the format of the datatype, so we translate it to unix
      // to convert it back to the actual date.
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      //   We are fetching some info. then accessing it
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  // By returning now we can pass the orders as a props meaning we can now
  // map through the orders
  return {
    props: {
      orders,
    },
  };
}
