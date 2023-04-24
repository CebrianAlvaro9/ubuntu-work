import React from 'react';
import { useState, useEffect } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd';
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
//a
function ObjectDetection({ option, handleOptionClick }) {

  const [model, setModel] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [predictions, setPredictions] = useState([]);

  console.log(modelLoaded);


  //LOAD TENSORFLOWS MODULES

  useEffect(() => {
    cocoSsd.load().then((loadedModel) => {
      setModel(loadedModel);
      setModelLoaded(true);
      if (loadedModel) { console.log("models loaded successfully"); }
    });
  }, []);


  // FUNCTION that selects the video from the DOM in order to start making predictions

  useEffect(() => {

    function predictWebcam() {
      if (modelLoaded) {

        const video = document.getElementById("detection");

        model.detect(video).then((newPredictions) => {

          setPredictions(newPredictions);
        });
      }
      //call the function back when the modules are loaded
      window.requestAnimationFrame(predictWebcam);
    }
    //starts making predictions
    predictWebcam();
  }, [model, modelLoaded]);

  // Renderize predictions as elements from the DOM
  const predictionElements = predictions.map((prediction) => {
    // _If there is a 66% of accuracy the progrmas shows predictions on the display
    if (prediction.score > 0.66) {
      const style = {
        marginLeft: prediction.bbox[0] + "px",
        marginTop: prediction.bbox[1] - 10 + "px",
        width: prediction.bbox[4] - 10 + "px",
        top: "0",
        left: "0",
      };
      return (
        <React.Fragment key={prediction.class}>
          <p className="camView" style={style}>
            {prediction.class} - with {Math.round(parseFloat(prediction.score) * 100)}% accuracy
          </p>
          <div
            className="highlighter zoom text-light"
            style={{
              left: prediction.bbox[0] + "px",
              top: prediction.bbox[1] + "px",
              width: prediction.bbox[2] + "px",
              height: prediction.bbox[3] + "px",
            }}
          ></div>
        </React.Fragment>
      );
    }
    return null;
  });

  if (modelLoaded) {
    return (
      // This will show the camera with all the predictions 
      <div id="principal" class="row justify-content-center align-items-center g-2 ">
        <div id="div-zoom" class="card bg-dark col-12 justify-content-center align-items-center">
          <h3 onClick={() => handleOptionClick(option)} id="ubi" class="card-header fw-bold text-light pt-0 text-secondary text-center">{option} </h3>
        </div>
        <React.Fragment></React.Fragment>
        <div id="div-zoom" class="col-12 justify-content-center align-items-center">
          <img crossOrigin='anonymous' width="100%" class="zoom" id="detection" src="http://10.131.48.110:8000/stream.mjpg"></img>

          <div>
            <button id="next" onClick={() => handleOptionClick("controller")} type="button" class="btn btn-secondary btn-lg">Home</button>
            {predictionElements}
          </div>

        </div>
      </div>

    );
  } else {
    //This will show a mesasge informating that the modules are being load
    return (
      <div id="principal" class="row justify-content-center align-items-center g-2 ">
        <div id="div-zoom" class="card bg-dark col-12 justify-content-center align-items-center pb-3 pt-3">
          <h3 onClick={() => handleOptionClick(option)} id="ubi" class="card-header fw-bold text-light pt-0 text-secondary text-center">LOADING OBJECT DETECTION FOR {option} </h3>
          </div>
          <div id="div-zoom" class="col-12 justify-content-center align-items-center text-center mt-5">
          <div class="spinner-border text-light"  style={{width: "8rem", height: "8rem"}} role="status">
          <span class="visually-hidden">Loading...</span>
          </div>
         
        </div>
      </div>
    );
  }

}


export default ObjectDetection;