import styles from "../styles/Set.module.css";

const Set = ({ set, exercises, selected }) => {
  const exercise = exercises.filter((exercise) => {
    return exercise._id === set.exerciseID;
  })[0];
  return (
    <div className={styles.holder}>
      {set.type === "exercise" ? (
        <div
          className={selected ? styles.selectedExerciseSet : styles.exerciseSet}
        >
          <div className={styles.dataHolder}>
            <h2>{exercise.name}</h2>
            <h3 className={styles.infoHolder}>
              {set.plannedWeight} Pounds {set.plannedReps} Reps
            </h3>
          </div>
        </div>
      ) : (
        <div className={selected ? styles.selectedRestSet : styles.restSet}>
          <div className={styles.dataHolder}>
            <h2 className={styles.type}>{set.type}</h2>

            <h3 className={styles.infoHolder}>{set.plannedDuration} Seconds</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Set;
