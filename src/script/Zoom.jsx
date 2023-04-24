import React, { useState, useEffect } from "react";
//imports to manage the database
import { getCameras, getPrueba, updateCamera } from '../data/firebase';
import { db } from '../data/firebase';

function Zoom({ option, handleOptionClick, auto }) {
  

 

  //get the url of the camera
  //Function which change the function to render
  const [cameras, setCameras] = useState([]);


  //function that gets the data from the database and converts in to an array in async 

  const [cameraUrl, setCameraUrl] = useState('');
  const [index, setIndex] = useState('');

useEffect(() => {
  async function fetchCameras() {
    const camerasList = await getCameras(db);
    console.log(camerasList);
    setCameras(camerasList);
    const found = camerasList.find(obj => obj.camera === option);
   
 
    setCameraUrl(found?.url || '');
  }

  fetchCameras();
}, [option, db]);

console.log(cameraUrl);



  //get the next element of the array in order to build the next button
  const currentIndex = cameras.findIndex(obj => {
    return obj.camera === option;
  });
  console.log("index actual "+currentIndex);

  function getNextElement(cam) {
  console.log("has clickado next, logintud "+ cameras.length );
    const nextIndex =currentIndex + 1;
    console.log("proximo index"+ nextIndex);
   
    if (nextIndex == cameras.length) {
     return cameras[0];
     } else {
       return cameras[nextIndex];
   }
  }

  // console.log("next cam " + getNextElement(cam).camera);
  return (

    <div id="principal" class="row justify-content-center align-items-center g-2 ">
      <div id="div-zoom" class="card bg-dark col-12 justify-content-center align-items-center">
        <h3 onClick={() => handleOptionClick(option)} id="ubi" class="card-header fw-bold text-light pt-0 text-secondary text-center">{option} </h3>
      </div>
      <div id="div-zoom" class="col-12 justify-content-center align-items-center">
        <img  width="100%" class="zoom z-0" id={`${option}`} src={cameraUrl}></img>
     
      </div>
      {!auto && (
          <div>
            <button id="return" onClick={() => handleOptionClick("controller")} type="button" class="btn btn-secondary btn-lg">Home</button>
            <button id="next" onClick={() => handleOptionClick(getNextElement(option).camera)} type="button" class="btn btn-secondary btn-lg">Next</button> 
          </div>
        )}
    </div>

  );
}


export default Zoom;