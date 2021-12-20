import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const ListWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const handleGetWorkouts = () => {
    axios
      .get(`${url}/workouts`)
      .then((data) => {
        setWorkouts(data.data);
        console.log(workouts);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <button onClick={handleGetWorkouts}>Get Workouts</button>
      {workouts &&
        workouts.map((workout) => {
          return <div>{JSON.stringify(workout)}</div>;
        })}
    </div>
  );
};

export default ListWorkouts;
