import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const ListWorkouts = ({workouts}) => {

  return (
    <div>
      <button >Get Workouts</button>
      {workouts &&
        workouts.map((workout) => {
          return <div>{JSON.stringify(workout)}</div>;
        })}
    </div>
  );
};

export default ListWorkouts;
