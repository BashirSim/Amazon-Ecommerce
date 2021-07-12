import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/client";

const api_access_key = "d9700cf5639488937d4df5309b7fd158";

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
    `http://api.ipstack.com/check?access_key=${api_access_key}&fields=country_name,location.country_flag`
  ).then((response) => response.json());

  return {
    props: {
      session,
      products,
      country,
    },
  };
}
