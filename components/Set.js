import styles from "../styles/Set.module.css";

const Set = ({ set, exercises }) => {
  const exercise = exercises.filter((exercise) => {
    return exercise._id === set.exerciseID;
  })[0];
  return (
    <>
      {set.type === "exercise" ? (
        <div className={styles.exerciseSet}>
          <h2 className={styles.type}>{set.type}</h2>
          <div className={styles.dataHolder}>
            <p>{exercise.name}</p>
            <p>{set.plannedWeight} Pounds</p>
            <p>{set.plannedReps} Reps</p>
          </div>
        </div>
      ) : (
        <div className={styles.restSet}>
          <h2 className={styles.type}>{set.type}</h2>
          <div className={styles.dataHolder}>
            <p>{set.plannedDuration} Seconds</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Set;
