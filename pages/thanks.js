import Head from "next/head";

import Layout from "@/components/Layout";

export default function ThanksPage() {
  return (
    <Layout>
      <Head>
        <title>Thanks! - Drone Delivery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl">Drone Delivery</h1>
        <p>Thanks for signing up!</p>
      </div>
      <div>{/* Display list of all users from db */}</div>
    </Layout>
  );
}
