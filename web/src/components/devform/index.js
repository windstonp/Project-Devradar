import React, { useState, useEffect } from "react";
function DevForm({ onSubmit }) {
const [github_username, setGithub_username] = useState("");
const [techs, setTechs] = useState("");
const [latitude, setlatitude] = useState("");
const [longitude, setlongitude] = useState("");
useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setlatitude(latitude);
        setlongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
}, []);
async function handlesubmit(e) {
    e.preventDefault();
    await onSubmit({
    	github_username,
      techs,
      latitude,
      longitude
    });
    setGithub_username("");
		setTechs("");
		onSubmit();
  }
  return (
    <form onSubmit={handlesubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Github Username</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
        ></input>
      </div>
      <div className="input-block">
        <label htmlFor="techs">Technologies</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        ></input>
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => {
              setlatitude(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-block">
          <label htmlFor="longitude">latitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => {
              setlongitude(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <button type="submit">Sign-in</button>
    </form>
  );
}
export default DevForm;
