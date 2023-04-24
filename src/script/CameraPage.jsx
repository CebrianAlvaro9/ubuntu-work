

import React, { useState, useEffect } from "react";
import Home from './Home';
import ObjectDetection from './ObjectDetection';
import Zoom from './Zoom';
import Controller from './Controller';
import Configuration from './Configuration';

//imports to manage the database
import { getCameras, getPrueba,updateoptionera} from '../data/firebase';
import { db } from '../data/firebase'; 

function CameraPage() {
  
  const [option, setOption] = useState("controller");
  const [auto, setAuto] = useState(false);
 
  const [numero, setNumero] = useState(0);

  //Function which change the function to render
  const [cameras, setCameras] = useState([]);


  //function that gets the data from the database and converts in to an array in async 

  useEffect(() => {
      async function fetchCameras() {
          const camerasList = await getCameras(db);
        
          setCameras(camerasList);
      }

      fetchCameras();
  }, []);

  //creates and array with the name of the optioneras from the data base
  const allowedoptions = cameras.map(camera => camera.camera);


  const handleOptionClick = (Option) => {
    console.log(Option);
    
    setOption(Option);
    setAuto(false);

  
  };


  //functions created to automaticcly change with a interval of 5 seconds all the options

  const handleAutoClick = () => {
    setAuto(!auto);
  };

  useEffect(() => {
    let interval;
    if(auto){
  
      interval = setInterval(() => {
        setNumero((prevnumero) => (prevnumero + 1) % allowedoptions.length);
      }, 5000);
  }

    return () => clearInterval(interval);
  }, [auto]);


  useEffect(() => {
    if (auto) {
      console.log(numero);
      setOption(allowedoptions[numero]);
    }
  }, [numero, auto]);

//this is the stichwer of the main menu which change the divs that ara projected in the DOM

  if(option==="Home"){
    return (
      <>
        <Home handleOptionClick={handleOptionClick} handleAutoClick={handleAutoClick} />
        
      </>
    );

   //recibes de name of the optionera that one to be zoom

  }else if(allowedoptions.includes(option)){
    return (
      <>
        <Zoom option={option} auto={auto} handleOptionClick={handleOptionClick} />
     
      </>
    );
  }else if(option==="controller"){
    return (
      <>
        <Controller option={option}  handleOptionClick={handleOptionClick} handleAutoClick={handleAutoClick} />
     
      </>
    );
  }else if(option==="Detect"){
    return (
      <>
        <ObjectDetection option={"Office"}  handleOptionClick={handleOptionClick}  />
     
      </>
    );
  }else if(option==="Settings"){
    return (
      <>
        <Configuration handleOptionClick={handleOptionClick}/>
     
      </>
    );
  }
}


export default CameraPage;
