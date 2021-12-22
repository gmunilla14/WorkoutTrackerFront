const PlanSet = ({set, exercises}) => {
    return ( <div><div>{set.type}</div>
    <div>{set.plannedWeight}</div>
    <div>{set.exerciseID}</div></div> );
}
 
export default PlanSet;