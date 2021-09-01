import Head from "next/head";

import Layout from "@/components/Layout";
import Form from "@/components/Form";
import clientPromise from "@/util/mongodb";

import smartyStreets from "@/util/smartyStreets";

export default function Home({ isConnected }) {
  if (isConnected) {
    console.log(`🚀 Connected to MongoDB!!!`);
  }

  smartyStreets();

  return (
    <Layout>
      <Head>
        <title>Drone Delivery</title>
      </Head>

      <div>
        <section className="flex flex-col items-center text-center px-4">
          <h1 className="text-3xl">Drone Delivery</h1>
          <p className="mt-2">
            Get started with our new drone delivery service today!
          </p>
        </section>
        <section className="px-4">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-10 sm:-left-14 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 -right-2 sm:-right-14 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-10 sm:left-24 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
            <Form />
          </div>
        </section>
      </div>

      {/* <div className="bg-white min-h-screen flex items-center justify-center px-16">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>
          <div className="m-8 relative space-y-4">
            <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
              <div className="flex-1">
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
              </div>
              <div className="w-24 h-6 rounded-lg bg-purple-300"></div>
            </div>

            <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
              <div className="flex-1">
                <div className="h-4 w-64 bg-gray-300 rounded"></div>
              </div>
              <div className="w-20 h-6 rounded-lg bg-yellow-300"></div>
            </div>

            <div className="p-5 bg-white rounded-lg flex items-center justify-between space-x-8">
              <div className="flex-1">
                <div className="h-4 w-44 bg-gray-300 rounded"></div>
              </div>
              <div className="w-28 h-6 rounded-lg bg-pink-300"></div>
            </div>
          </div>
        </div>
      </div> */}

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
