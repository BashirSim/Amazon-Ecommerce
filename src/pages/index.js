import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/client";

const ipInfo = process.env.api_access_key;

export default function Home({ products, country }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header country={country} />
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* ProductFeed */}

        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // this line is to fetch the session beforehand so we can remove
  // the flickring when we get the session at account
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  const country = await fetch(
    `http://ip-api.com/json/`
    // `http://api.ipstack.com/check?access_key=${ipInfo}&fields=country_name,location.country_flag`
  ).then((response) => response.json());

  console.log(country);
  return {
    props: {
      session,
      products,
      country,
    },
  };
}
