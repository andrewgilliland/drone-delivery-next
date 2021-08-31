import { useState, useContext } from "react";
import router from "next/router";
// import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

import { DroneDeliveryContext } from "@/context/Context";

import useForm from "@/util/hooks/useForm";
import Button from "@/components/Button";

export default function Form() {
  const { values, updateValue } = useForm({
    name: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const { user, handleChangeUser } = useContext(DroneDeliveryContext);

  function handleSubmit(e) {
    e.preventDefault();
    // 1. Check db to see if user exists
    // If user exists, display error message and exit
    // Else

    // 2. Verify address with API

    // 3. Geocode address with API

    // 4. Put User data into context
    handleChangeUser({
      name: values.name,
      street: values.street,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
    });
    // Redirect to verify page
    router.push("/verify");
  }

  return (
    <form
      className="flex flex-col border border-gray-100 shadow-md p-5 rounded-sm mt-5"
    >
     

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
      <Button handleSubmit={handleSubmit}>Get Started</Button>
    </form>
  );
}
