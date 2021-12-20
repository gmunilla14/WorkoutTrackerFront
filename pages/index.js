import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import ListWorkouts from "../components/ListWorkouts";
import ListMuscles from "../components/ListMuscles";
import ListPlans from "../components/ListPlans";
import ListExercises from "../components/ListExercises";
import AddPlan from "../components/AddPlan";
import AddMuscle from "../components/AddMuscle";

import { useState } from "react";
export default function Home() {
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState({
    name: "",
    creatorID: "",
    sets: [],
  });

  return (
    <div className={styles.container}>
      AAAAA
      <ListWorkouts />
      <AddMuscle />
      <ListMuscles />
      <ListPlans
        plans={plans}
        setPlans={setPlans}
        currentPlan={currentPlan}
        setCurrentPlan={setCurrentPlan}
      />
      <AddPlan currentPlan={currentPlan} setCurrentPlan={setCurrentPlan} />
      <ListExercises />
    </div>
  );
}
