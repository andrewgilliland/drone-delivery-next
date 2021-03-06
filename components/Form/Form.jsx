import { useState, useContext } from "react";
import router from "next/router";

import { DroneDeliveryContext } from "@/context/Context";

import useForm from "@/util/hooks/useForm";
import { isAddressValid } from "@/util/smartyStreets";
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    // 0. Check to see if any inputs are left blank
    if (values.name === "") {
      setError(`Please enter your name on the form`);
      setLoading(false);
      return;
    }
    if (values.street === "") {
      setError(`Please enter your street address on the form`);
      setLoading(false);
      return;
    }
    if (values.city === "") {
      setError(`Please enter your city on the form`);
      setLoading(false);
      return;
    }
    if (values.state === "") {
      setError(`Please enter your state on the form`);
      setLoading(false);
      return;
    }
    if (values.zipcode === "") {
      setError(`Please enter your zipcode on the form`);
      setLoading(false);
      return;
    }
    // let userArray = Object.entries(userData);
    // await userArray.map((prop) => {
    //   console.log(prop[1]);
    //   if (prop[1] === "") {
    //     console.log(`${prop[0]} is an empty string`);
    //     setError(`Please enter the your ${prop[0]} on the form`);
    //     return;
    //   }
    // });

    // 1. Check db to see if user exists
    const searchVal = await searchUserByName(values);

    // If user exists, display error message and exit
    if (Object.keys(searchVal).length === 1) {
      setError(`The user with this name has already signed up!`);
      setLoading(false);
      return;
    }
    // Else
    setError("");

    // 2. Verify address with API
    const validAddress = await isAddressValid(values);
    if (!validAddress) {
      setError(`The address entered is not valid!`);
      setLoading(false);
      return;
    }
    console.log("address IS valid");
    setError("");

    // Else
    // 3. Geocode address with API
    const addressString = `${values.street}, ${values.city}, ${values.state} ${values.zipcode}`;
    const geocode = await getGeoCodeFromAddress(addressString);

    // 4. Add geocode data into context
    handleChangeUser({
      name: values.name,
      street: values.street,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
      geocode: geocode,
    });

    // 5. Redirect to verify page
    router.push("/verify");
  }

  return (
    <form className="relative bg-white flex flex-col border border-gray-100 shadow-md p-5 rounded-sm mt-5">
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
      <Button handleSubmit={handleSubmit}>
        {loading ? "Loading..." : "Get Started"}
      </Button>
    </form>
  );
}
