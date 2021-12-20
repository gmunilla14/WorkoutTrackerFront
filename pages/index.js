import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ListWorkouts from "../components/ListWorkouts";
import ListMuscles from "../components/ListMuscles";
import ListPlans from "../components/ListPlans";
import ListExercises from "../components/ListExercises";
import AddPlan from "../components/AddPlan";
import AddMuscle from "../components/AddMuscle";
import AddExercise from "../components/AddExercise";

import { useState } from "react";
export default function Home() {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({
    name: "",
    creatorID: "",
    sets: [],
  });
  const [muscles, setMuscles] = useState([]);

  return (
    <div className={styles.container}>
      AAAAA
      <ListWorkouts />
      <AddMuscle />
      <ListMuscles muscles={muscles} setMuscles={setMuscles} />
      <ListPlans plans={plans} setPlans={setPlans} />
      <AddPlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
      <AddExercise muscles={muscles} />
      <ListExercises />
    </div>
  );
}
