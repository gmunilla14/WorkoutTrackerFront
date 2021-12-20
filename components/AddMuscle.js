import axios from "axios";
import { useState } from "react";
import { url } from "../api";

const AddMuscle = () => {
  const [muscle, setMuscle] = useState({
    name: "",
  });
  const onCreateMuscle = () => {
    axios
      .post(`${url}/muscles`, muscle)
      .then(() => {
        setMuscle({
          name: "",
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onNameChange = (e) => {
    setMuscle({ ...muscle, name: e.target.value });
  };
  return (
    <div>
      Add Muscle
      <form onSubmit={onCreateMuscle}>
        <input placeholder="Set Muscle Name" onChange={onNameChange}></input>
        <button type="submit">Create Muscle</button>
      </form>
    </div>
  );
};

export default AddMuscle;
