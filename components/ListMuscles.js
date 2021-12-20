import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const ListMuscles = () => {
  const [muscles, setMuscles] = useState([]);
  const handleGetMuscles = () => {
    axios.get(`${url}/muscles`).then((data) => {
      setMuscles(data.data);
      console.log(muscles);
    });
  };
  return (
    <div>
      <button onClick={handleGetMuscles}>Get Muscles</button>
      {muscles &&
        muscles.map((muscle) => {
          return <div>{JSON.stringify(muscle)}</div>;
        })}
    </div>
  );
};

export default ListMuscles;
