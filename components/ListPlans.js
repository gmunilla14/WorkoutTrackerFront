import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const ListPlans = ({ plans, setPlans }) => {

  const handleGetPlans = () => {
    axios
      .get(`${url}/plans`)
      .then((data) => {
        setPlans(data.data);
        console.log(plans);
        console.log(plans[0].sets.length);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <button onClick={handleGetPlans}>Get Plans</button>
      {plans &&
        plans.map((plan) => {
          return <div>{JSON.stringify(plan)}</div>;
        })}
      
    </div>
  );
};

export default ListPlans;
