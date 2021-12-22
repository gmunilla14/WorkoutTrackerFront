import Link from "next/link";
import axios from "axios";
import { url } from "../api";
import ListMuscles from "../components/ListMuscles";
import ListExercises from "../components/ListExercises";
import ListPlans from "../components/ListPlans";
import ListWorkouts from "../components/ListWorkouts";

export const getServerSideProps = async (context) => {
  const muscleRes = await fetch(`${url}/muscles`);
  const muscles = await muscleRes.json();
  const exerciseRes = await fetch(`${url}/exercises`);
  const exercises = await exerciseRes.json();

  const planRes = await fetch(`${url}/plans`);
  const plans = await planRes.json();

  const workoutRes = await fetch(`${url}/workouts`)
  const workouts = await workoutRes.json()
  return {
    props: { muscles, exercises, plans, workouts },
  };
};
const Home = ({ muscles, exercises, plans, workouts }) => {
  console.log(muscles);
  return (
    <>
      <section>
        <Link href="/">
          <button> Create Workout Plan</button>
        </Link>
        <button>Start Workout</button>
        {muscles.map((muscle) => {
          return <div>{muscle.name}</div>;
        })}
      </section>
      <ListMuscles muscles={muscles} />
      <ListExercises exercises={exercises} />
      <ListPlans plans={plans} />
      <ListWorkouts workouts = {workouts} />
    </>
  );
};

export default Home;
