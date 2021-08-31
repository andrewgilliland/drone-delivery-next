import Head from "next/head";

import Layout from "@/components/Layout";
import Form from "@/components/Form";
import clientPromise from "@/util/mongodb";

export default function Home({ isConnected }) {
  if (isConnected) {
    console.log(`🚀 Connected to MongoDB!!!`);
  }

  return (
    <Layout>
      <Head>
        <title>Drone Delivery</title>
      </Head>

      <main>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Drone Delivery</h1>
          <p className="mt-2">
            Get started with our new drone delivery service today!
          </p>
        </div>
        <Form />
        
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
