import { useState } from "react";
import axios from "axios";
import { url } from "../api";

const AddExercise = ({ muscles }) => {
  const onSelectChange = (e) => {
    if (e.target.checked) {
      let newIDs = exercise.muscleIDs;
      newIDs.push(e.target.value);
      setExercise({ ...exercise, muscleIDs: newIDs });
    } else {
      let newIDs = exercise.muscleIDs.filter((id) => {
        return id !== e.target.value;
      });
      setExercise({ ...exercise, muscleIDs: newIDs });
    }
  };

  const onNameChange = (e) => {
    setExercise({ ...exercise, name: e.target.value });
    console.log(exercise);
  };

  const onCreateExercise = () => {
    axios
      .post(`${url}/exercises`, exercise)
      .then(() => {
        setExercise({
          name: "",
          muscleIDs: [],
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const onNotesChange = (e) => {
    setExercise({ ...exercise, notes: e.target.value });
  };

  const [exercise, setExercise] = useState({
    name: "",
    muscleIDs: [],
  });
  return (
    <div>
      Add Exercise
      <form onSubmit={onCreateExercise}>
        <input onChange={onNameChange} placeholder="Exercise Name"></input>
        <input onChange={onNotesChange} placeholder="Notes"></input>
        {muscles &&
          muscles.map((muscle) => {
            return (
              <>
                <input
                  type="checkbox"
                  id={muscle._id}
                  name={muscle.name}
                  value={muscle._id}
                  onChange={onSelectChange}
                />
                <label for={muscle.name}>{muscle.name}</label>
                <br></br>
              </>
            );
          })}
        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
};

export default AddExercise;
