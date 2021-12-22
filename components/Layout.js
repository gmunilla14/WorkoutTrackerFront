import { useState } from "react";

const Layout = ({ children }) => {
    const [plans, setPlans] = useState([])
    const [currentPlan, setCurrentPlan] = useState({
        
    })
  return (
    <div>
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
      <main>{children}</main>
    </div>
  );
};

export default Layout;
