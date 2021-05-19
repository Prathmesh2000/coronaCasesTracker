import React from 'react'
import Fetch from './fetch'
import Top from './top'
import mask from './assets/mask.png'

function App(){
  return(
    <div>
      <Top />
      <br/>
      <img id ="mask" src={mask} alt="mask"/>
      <Fetch />
    </div>
  )
} 

export default App