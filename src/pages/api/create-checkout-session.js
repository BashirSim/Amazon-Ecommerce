// backend code API endpoint
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  // This step is to transform our items format (data) to stripe
  // format (data)
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: 1,
    price_data: {
      currency: "usd",
      // The stripe API calculate the amount in the subcurrency
      // in this case is cents, thats why we * by 100
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1J9pcqEvu6JVNFARMxWPKVdR"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  // 200 is ok
  // 302 is the redirect status
  res.status(200).json({ id: session.id });
  // This console log is appearing on the terminal (back-end)
  //   console.log(items, email);
};
