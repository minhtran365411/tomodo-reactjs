//importing components & pages
import App from "../App";
import Timer from "../components/Timer";
import Settings from "../components/Settings";
import SettingsContext from "../components/SettingsContext";

import { useState } from "react";

//For this Paramodo part I followed this youtube video: https://www.youtube.com/watch?v=B1tjrnX160k
//this is just an add on for my project
//the whole todo, subtodos & musicbox work are 100% my work


function Paramodo() {
  //set a state to only show either settings page or timer page
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    
    <div>
    <App></App>
    <SettingsContext.Provider value={{
      workMinutes: workMinutes,
      breakMinutes: breakMinutes,
      setWorkMinutes,
      setBreakMinutes, 
      showSettings,
      setShowSettings //pass to be used to both settings & timer
    }}>
        {showSettings ? <Settings /> : <Timer />}
    </SettingsContext.Provider>
    
    </div>

  );
}

export default Paramodo;
