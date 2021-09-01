import { useState, useContext } from "react";
import router from "next/router";

import { DroneDeliveryContext } from "@/context/Context";

import useForm from "@/util/hooks/useForm";
import smartyStreets from "@/util/smartyStreets";
import { getGeoCodeFromAddress } from "@/util/geocode";
import Button from "@/components/Button";

export default function Form() {
  const { values, updateValue } = useForm({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [error, setError] = useState("");

  // smartyStreets();

  const { userData, handleChangeUser } = useContext(DroneDeliveryContext);

  async function searchUserByName(user) {
    const data = await fetch(
      `http${process.env.NEXT_PUBLIC_URL}/api/search?term=${user.name}`
    );
    const res = await data.json();
    return res;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // 1. Check db to see if user exists
    const searchVal = await searchUserByName(values);

    // If user exists, display error message and exit
    if (Object.keys(searchVal).length === 1) {
      setError(`The user with this name has already signed up!`);
      return;
    }

    // Else
    setError("");
    // 2. Verify address with API
    // Take data returned from API and create boolean
    // If "unverified" set new Error Message and return
    // if (Object.keys(searchVal).length === 1) {
    //   setError(`This is not a verified address!`);
    //   return;
    // }

    // Else
    // 3. Geocode address with API
    const addressString = `${values.street}, ${values.city}, ${values.state} ${values.zipcode}`;
    const geocode = await getGeoCodeFromAddress(addressString);

    // 4. Put User data into context
    handleChangeUser({
      name: values.name,
      street: values.street,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
      geocode: geocode,
    });

    // const geocodeObject
    // const geo = Object.entries(geocode);
    // console.log(geo);

    // 5. Redirect to verify page
    router.push("/verify");
  }

  return (
    <form className="flex flex-col border border-gray-100 shadow-md p-5 rounded-sm mt-5">
      <label htmlFor="name">Name</label>
      <input
        className="bg-gray-100 rounded-md px-2 py-1"
        type="text"
        name="name"
        id="name"
        value={values.name}
        onChange={updateValue}
      />
      <div className="flex flex-col mt-3">
        <label htmlFor="street">Street</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="street"
          id="street"
          value={values.street}
          onChange={updateValue}
          max={50}
        />
        <label htmlFor="city">City</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="city"
          id="city"
          value={values.city}
          onChange={updateValue}
          max={64}
        />
        <label htmlFor="state">State</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="state"
          id="state"
          value={values.state}
          onChange={updateValue}
          max={32}
        />
        <label htmlFor="zipcode">Zipcode</label>
        <input
          className="bg-gray-100 rounded-md px-2 py-1"
          type="text"
          name="zipcode"
          id="zipcode"
          value={values.zipcode}
          onChange={updateValue}
          max={16}
        />
      </div>
      <div>
        <p
          className={`${
            error
              ? "bg-red-100 text-sm text-red-500 text-center px-4 py-1 rounded-full mt-5 border border-red-500"
              : "hidden"
          }`}
        >
          {error}
        </p>
      </div>
      <Button handleSubmit={handleSubmit}>Get Started</Button>
    </form>
  );
}
