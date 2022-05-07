import React from "react";
import { Redirect } from "react-router-dom";
import Footer from "../components/footer";
import { useUser } from "../components/usercontext";
import "./about.css";

const About: React.FunctionComponent = () => {

  const { authenticated, isNavExpanded} = useUser();
  
  return (
    <div className="About">
    {!authenticated ? <Redirect to="/" /> : 
      isNavExpanded ? <div /> : 
        <div className="About">
            <h2>Gearpool reservation system</h2>
            <p>Just grab gear, and tap calendar to reserve the gear for your</p>
            <h3>Is something missing?</h3>
            <p>Contribute to the project on <a href="https://github.com/Summeli/Gearpool" target="_blank">Github</a></p><br />
            <p>You can also <a href="https://github.com/Summeli/Gearpool/issues" target="_blank">create an issue</a> and hope that someone implements that for you.</p>
        </div> 
    }
      <Footer />
   </div> 
  );
};



export default About;