import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const ListExercises = () => {
  const [exercises, setExercises] = useState([]);
  const handleGetExercises = () => {
    axios
      .get(`${url}/exercises`)
      .then((data) => {
        setExercises(data.data);
        console.log(exercises);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <button onClick={handleGetExercises}>Get Exercises</button>
      {exercises &&
        exercises.map((exercise) => {
          return <div>{JSON.stringify(exercise)}</div>;
        })}
    </div>
  );
};

export default ListExercises;
