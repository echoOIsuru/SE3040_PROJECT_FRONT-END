import React from "react";
import { useEffect, useState } from "react";

export default function PanelMemberRegister(){
    const [name, setName] = useState('');
    const [done, setDone] = useState('');

    const [data, setData] = useState('close');

    useEffect (()=> {
        setData("open")
        if(name != '')
        setData("WORKED!!")

        console.log("llllll");
    },[name])

    const click = () => {
        setDone("DONE ! ")
    }

    return(
        <>
            <h1>{data}</h1>
            <h1>{name}</h1>
            <input type="text" onChange={(event)=>{
                setName(event.target.value)
            }} placeholder="name"></input>

            <button onClick={click}>Ok</button>
        </>
        
    )
}