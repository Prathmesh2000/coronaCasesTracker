import React, {useState, useEffect} from 'react'

function Fetch(){
    const [active, setActive] = useState([])
    const [death, setDeath] = useState([])
    const [conformed, setConformed] = useState([])
    const [recovered, setRecovered] = useState([])
    const [updateTime, setUpdateTime] = useState([])
    const [stateNames, setStateNames] = useState('')
    const [option, setOption] = useState('India')
    const [optionId, setOptionID] = useState(0)

    useEffect(() => {
        const getCovidData = async () =>{
            try{
                const res = await fetch('https://api.covid19india.org/data.json');
                const data = await res.json();
                const state = await new Array(data.statewise.length)

                for(var i=1;i<data.statewise.length;i++){
                    state.push(data.statewise[i].state)
                }
                await setStateNames(state)

                const active= await new Array(data.statewise.length)
                for(i=0;i<data.statewise.length;i++){
                    active.push(data.statewise[i].active)
                }
                await setActive(active)
                
                const death= await new Array(data.statewise.length)
                for(i=0;i<data.statewise.length;i++){
                    death.push(data.statewise[i].deaths)
                }
                await setDeath(death)

                const conformed= await new Array(data.statewise.length)
                for(i=0;i<data.statewise.length;i++){
                    conformed.push(data.statewise[i].confirmed)
                }
                await setConformed(conformed)

                const recovered= await new Array(data.statewise.length)
                for(i=0;i<data.statewise.length;i++){
                    recovered.push(data.statewise[i].recovered)
                }
                await setRecovered(recovered)

                const updateTime= await new Array(data.statewise.length)
                for(i=0;i<data.statewise.length;i++){
                    updateTime.push(data.statewise[i].lastupdatedtime)
                }
                await setUpdateTime(updateTime)

            }catch(err){
                console.log(err);   
            }
        }
        getCovidData()
    }, []);

    var states = []
    for(var i=38;i<75;i++){
        states.push(stateNames[i])
    }
    
    const state = [{}]
    const newObj1 = {
        id:0,
        stateName:"India"
    }
    state.push(newObj1)
    for(const item of Object.entries(states)){
        const newObj = {
            id: 0,
            stateName: ''
        }
        newObj.id = parseInt(item[0])+1
        newObj.stateName = item[1]
        state.push(newObj)
    }

    const resultState = state.slice(1,state.length)

    function createOption(value){
        return(
        <option  key={value.id}>{value.stateName}</option>)
    }

    function handleChange(e){
        setOption(e);
        for (var i=0; i < resultState.length; i++) {
            if (resultState[i].stateName === e) {
                setOptionID (resultState[i].id)
            }
        }
    }
    return(
        <div>
            <div className="dropdowndiv">
                <select className="dropdown" onChange={(event) => handleChange(event.target.value)}
                    value={option}>
                    {resultState.map(createOption)}
                </select>
            </div>
            <ul>
                <h1>Location: {option}</h1>
                <h1>Active: {active[optionId+resultState.length]}</h1>
                <h1>Death: {death[optionId+resultState.length]}</h1>
                <h1>Confirmed: {conformed[optionId+resultState.length]}</h1>
                <h1>Recovered: {recovered[optionId+resultState.length]}</h1>
                <h1>Last Update : {updateTime[optionId+resultState.length]}</h1>
            </ul>
        </div>

    )
}

export default Fetch 