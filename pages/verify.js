import { useEffect, useContext } from "react";
import Head from "next/head";
import router, { useRouter } from "next/router";

import { DroneDeliveryContext } from "@/context/Context";

import Layout from "@/components/Layout";
import Button from "@/components/Button";

export default function VerifyPage() {
  const { userData, handleChangeUser } = useContext(DroneDeliveryContext);

  useEffect(() => {
    // If no user exists in context is empty, go back to home page
    if (Object.keys(userData).length === 0 || userData.name === "") {
      router.push("/");
    }
  }, []);

  async function createUser(user) {
    const data = await fetch(
      `http://localhost:3000/api/createUser?name=${user.name}&street=${user.street}&city=${user.city}&state=${user.state}&zipcode=${user.zipcode}&verified=true`
    );
    const res = await data.json();
    console.log(res);
  }

  function verifiedSubmit(e) {
    e.preventDefault();

    // Put user data from context into db
    createUser(userData);
    // Redirect to the thanks page
    router.push("/thanks");
  }

  function unVerifiedSubmit(e) {
    e.preventDefault();
    router.push("/");
  }

  return (
    <Layout>
      <Head>
        <title>Drone Delivery</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-32">
        <p className="text-center">
          {userData.name} please verify that <br />
          <span className="border border-green-500 bg-green-100 text-green-800 rounded-md px-1">
            {userData.street}, {userData.city}, {userData.state}{" "}
            {userData.zipcode}
          </span>
          <br />
          is your correct address.
        </p>
      </div>

      <div className="flex gap-5">
        <Button handleSubmit={verifiedSubmit}>Verify</Button>
        <Button color="red" handleSubmit={unVerifiedSubmit}>
          This is Incorrect
        </Button>
      </div>
    </Layout>
  );
}
