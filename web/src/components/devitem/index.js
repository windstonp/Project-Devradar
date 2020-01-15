import React from 'react';
import './style.css';
function Devitem({dev}){
    return(
        <li className="dev-item">
        <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(', ')}</span>
        </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://https://github.com/${dev.github_username}`}>Github Profile</a>
        </li>
    )
};
export default Devitem;