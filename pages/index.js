import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ListWorkouts from "../components/ListWorkouts";
import ListMuscles from "../components/ListMuscles";
import ListPlans from "../components/ListPlans";
import ListExercises from "../components/ListExercises";
import AddPlan from "./AddPlan";
import AddMuscle from "../components/AddMuscle";
import AddExercise from "../components/AddExercise";

import { useState } from "react";
export default function Home() {
  const [plans, setPlans] = useState([]);

  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);

  return (
    <div className={styles.container}>
      AAAAA
      <ListWorkouts />
      <h1>Muscles</h1>
      <AddMuscle />
      <ListMuscles muscles={muscles} setMuscles={setMuscles} />
      <h1>Plans</h1>
      <AddPlan

        exercises={exercises}
      />
      <ListPlans plans={plans} setPlans={setPlans} />
      <h1>Exercises</h1>
      <AddExercise muscles={muscles} />
      <ListExercises exercises={exercises} setExercises={setExercises} />

    </div>
  );
}
