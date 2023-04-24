//this function displays all the cameras
import React, { useState, useEffect, useRef } from "react";

//imports to manage the database
import { getCameras, getPrueba,updateCamera} from '../data/firebase';
import { db } from '../data/firebase'; 

function Home({ handleOptionClick ,handleAutoClick }) {

  const [cameras, setCameras] = useState([]);


  //function that gets the data from the database and converts in to an array in async 

  useEffect(() => {
      async function fetchCameras() {
          const camerasList = await getCameras(db);
          setCameras(camerasList);
      }
      fetchCameras();
  }, []);

  
    return (
      <div id="principal" className="row justify-content-center align-items-center g-2 ">
        <div id="intro" className="card bg-dark col-12 text-light text-center">
          <h2 className="display-4 fw-bold" onClick={() => handleAutoClick()}>CAMERAS</h2>
          <p>Automatic mode</p>
        </div>
        {cameras.map(camera => (
          <div onClick={() => handleOptionClick(camera.camera)} key={camera.camera} className="card bg-dark col-4 justify-content-center align-items-center double-view">
            <h3 className="fw-bold text-light card-header text-secondary text-center hHome">{camera.camera}</h3>
         
            <iframe className="normal " id={`${camera.camera}`} src={camera.url}></iframe>
        
          </div>
        ))}
      </div>
    );
  }


  export default Home;