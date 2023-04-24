//this function displays a control panel
import React, { useState, useEffect } from "react";


//this function just displays the controller with the different options

function Controller({ handleOptionClick, handleAutoClick }) {

  const options = ["Home", "Auto", "Detect", "Settings"];

  let classresponsive = "";
  let div = "";

  if (window.innerWidth == 800) {
    classresponsive = "mt-2 marginHome";


  } else {
    classresponsive = "mt-4 m-2";

  }

  return (
    <div id="principal" className="row justify-content-center align-items-center g-2">
      <div className="card bg-dark col-12 text-light text-center pt-3 pb-3 mb-3  border-bottom border-dark ">
        <h2 className='display-4 fw-bold'>CAMERA CONTROLLER</h2>
      </div>
      <div className="row p-2 justify-content-center align-items-center" >
        {options.map((option) => (

          option === "Auto" ? (
            <div onClick={() => handleAutoClick()} id={option} key={option} 
            className={`card bg-dark col-4 border border-light p-5 ${classresponsive} text-light text-center`}>
              <h3 className="display-5 fw-bold">
                {option}
              </h3>
            </div>
          ) : (
            <div onClick={() => handleOptionClick(option)} id={option} key={option} 
            className={`card bg-dark col-4 border border-light p-5 ${classresponsive} text-light text-center`}>
              <h3 className="display-5 fw-bold">
                {option}
              </h3>
            </div>
          )))}
      </div>
    </div>
  );


}


export default Controller;