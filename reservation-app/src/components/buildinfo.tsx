import React, { useState } from 'react';
import axios from 'axios';
import preval from 'preval.macro';

const BuildInfo: React.FunctionComponent = () => {
    const buildTimestamp : string = preval`module.exports = new Date().toLocaleString();`;

    const [buildinfo, setBuildinfo] = useState("");

    React.useEffect(() => {
       axios.get("/api/showbuild").then(function (response) {
          if(response.status === 200 && response.data === true){
            setBuildinfo("Build time = " + buildTimestamp);
          }
        })
      },[buildTimestamp]);

    console.log(buildinfo);
    return <div className="buildtime">{buildinfo}</div>;
  };
  
  export default BuildInfo;