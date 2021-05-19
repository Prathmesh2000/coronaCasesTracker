import React from 'react'
import image from './assets/earth.png';

function Top(){
    return(
        <div className="nav">
            <img src={image} alt="earth with mask"/>
            <h1>CORONA CASES UPDATE</h1>
        </div>
    )
}

export default Top