//this function displays all the cameras
import React, { useState, useEffect, useRef } from "react";
//imports to manage the database
import { getCameras, getPrueba,updateCamera} from '../data/firebase';
import { db } from '../data/firebase'; 
// import { cameras } from '../data/data'; old code with arrays 

//this fucntion allows the user to change the info form the cameras name and IP in real time conected with FireBAse
//
function Configuration({ handleOptionClick }) {

    const ref = useRef(null);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [cameraName, setCameraName] = useState("");
    const [cameraUrl, setCameraUrl] = useState("");
    const [cameras, setCameras] = useState([]);


    //function that gets the data from the database and converts in to an array in async 

    useEffect(() => {
        async function fetchCameras() {
            const camerasList = await getCameras(db);
            console.log(camerasList);
            setCameras(camerasList);
        }

        fetchCameras();
    }, []);


    //selection of the div in order to add a different color 

    const handleCameraSelect = (camera) => {
        setSelectedCamera(camera);
        setCameraName(camera.camera);
        setCameraUrl(camera.url);
        const cameraDivs = ref.current.querySelectorAll(".camera-div");
        cameraDivs.forEach((div) => {
            if (div.querySelector("h5").textContent === camera.camera) {
                div.classList.add("bg-secondary");
            } else {
                div.classList.remove("bg-secondary");
            }
        });

    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        name === "name" ? setCameraName(value) : setCameraUrl(value);
    };

 //this function change the camera info by the new submitted info for the cameras

    const handleCameraModify = async () => {
        const cameraId = selectedCamera.id;
        const newData = { camera: cameraName, url: cameraUrl };
        await updateCamera(db, cameraId, newData);
        const camerasList = await getCameras(db);
        setCameras(camerasList);
      };


    return (
        <div ref={ref} id="principal" className="row justify-content-center align-items-center g-2 ">
            <div id="intro" className="card bg-dark col-12 text-light text-center">
                <h2 className="display-4 fw-bold" >CAMERAS CONFIGURATION</h2>
                <p>Select the camera you want to modify</p>
            </div>
            <div class="row justify-content-center align-items-center g-2 text-light">
                <div className="col-md-6 col-lg-4 " >
                {cameras.map((camera, index) => (
                    <div onClick={() => handleCameraSelect(camera)} className="col camera-div" key={index}>
                        <h4 >CAMERA {index + 1}</h4>
                        <h5>{camera.camera}</h5>
                        <p>IP: {camera.url} </p>
                    </div>
                ))}
                </div>

                
              
                {selectedCamera && (
                    
                    <div className="card bg-light col-6 p-2">
                        <h3 className="text-dark">Modify camera {selectedCamera.camera}</h3>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={cameraName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="url"
                                name="url"
                                value={cameraUrl}
                                onChange={handleInputChange}
                            />
                      
                        </div>
                        <button className="btn btn-primary" onClick={handleCameraModify}>Save changes</button>
                    </div>
                )}


            </div>
            <br />
            <div>
                <button id="return-settings" onClick={() => handleOptionClick("controller")} type="button" class="btn btn-secondary btn-lg">Home</button>
            </div>
        </div>
    );
}


export default Configuration;