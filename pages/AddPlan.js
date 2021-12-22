import axios from "axios";
import { useState } from "react";
import { url } from "../api";
import Set from "../components/Set";

export const getServerSideProps = async (context) => {
  const exerciseRes = await fetch(`${url}/exercises`);
  const exercises = await exerciseRes.json();

  return {
    props: {exercises}
  }
}


const AddPlan = ({ exercises }) => {
  const [set, setSet] = useState({});
  const [currentPlan, setCurrentPlan] = useState({
    name: '',
    creatorID: '',
    sets: []
  })

  const onNameChange = (e) => {
    setCurrentPlan({ ...currentPlan, name: e.target.value });
    console.log(currentPlan);
  };

  const onCreatorChange = (e) => {
    setCurrentPlan({ ...currentPlan, creatorID: e.target.value });
  };

  const onTypeChange = (e) => {
    setSet({ type: e.target.value });

    document.getElementById("setForm").reset();

    console.log(set);
  };

  const onWeightChange = (e) => {
    setSet({ ...set, plannedWeight: e.target.value });
    console.log(set);
  };

  const onRepChange = (e) => {
    setSet({ ...set, plannedReps: e.target.value });
    console.log(set);
  };

  const onExerciseChange = (e) => {
    setSet({ ...set, exerciseID: e.target.value });
  };

  const onDurationChange = (e) => {
    setSet({ ...set, plannedDuration: e.target.value });
    console.log(set);
  };

  const onSetAdd = () => {
    let newSets = currentPlan.sets;
    console.log("newSets");
    console.log(newSets);
    newSets.push(set);
    setCurrentPlan({ ...currentPlan, sets: newSets });
    console.log("Set");
  };

  const onCreatePlan = () => {
    axios
      .post(`${url}/plans`, currentPlan)
      .then(() => {
        handleGetPlans();
        setCurrentPlan({});
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div>
      <div>
        <form>
          <input placeholder="Set Plan Name" onChange={onNameChange}></input>
          <input
            placeholder="Set Plan Creator ID"
            onChange={onCreatorChange}
          ></input>
        </form>
      </div>
      <div>
        ---------------------------------------------------
        <div>
          <form id="typeForm">
            <fieldset onChange={onTypeChange}>
              <legend>What type of set is this?</legend>
              <input
                id="exercise"
                type="radio"
                name="setType"
                value="exercise"
              />
              <label for="exercise">Exercise</label>
              <br />
              <input id="rest" type="radio" name="setType" value="rest" />
              <label for="exercise">Rest</label>
            </fieldset>
          </form>

          <form id="setForm">
            {set.type === "exercise" ? (
              <>
                <input
                  id="plannedWeight"
                  onChange={onWeightChange}
                  placeholder="Set Planned Weight (lb)"
                ></input>{" "}
                <br />
                <input
                  id="plannedReps"
                  onChange={onRepChange}
                  placeholder="Set Planned Reps"
                ></input>{" "}
                <br />
                <fieldset>
                  {exercises &&
                    exercises.map((exercise) => {
                      return (
                        <>
                          <input
                            type="radio"
                            value={exercise._id}
                            id={exercise._id}
                            onChange={onExerciseChange}
                            name="exerciseRadio"
                          ></input>
                          <label for={exercise._id}>{exercise.name}</label>
                          <br />
                        </>
                      );
                    })}
                </fieldset>
              </>
            ) : (
              <>
                <input
                  id="plannedDuration"
                  onChange={onDurationChange}
                  placeholder="Set planned duration (sec)"
                ></input>
              </>
            )}
          </form>
          <button onClick={onSetAdd}>Add Set</button>
          <button onClick={onCreatePlan}>Create Plan</button>
        </div>
      </div>
      <div>{JSON.stringify(currentPlan)}</div>
      {currentPlan.sets && currentPlan.sets.map((set) => {
        return <Set set={set} exercises={exercises}/>
      })}
    </div>
  );
};

export default AddPlan;
