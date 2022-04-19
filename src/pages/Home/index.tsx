import { useState, useEffect } from "react";
import { Api } from "../../services/api";

export default function Home(){
    const [foods,setFoods] = useState([]);

    const token = localStorage.getItem('token');
    console.log(token)

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    async function fetchFoods(){
        const response = await Api.get("getFoods",authorization);
        setFoods(response.data.list);
        console.log(response);
        console.log(foods); 
    }

    //useEffect(()=>{
   //     fetchFoods();
   // },[foods]);

    return(
        <div>
            <h1>Home</h1>
            <button onClick={fetchFoods}>Foods List</button>

        </div>
    );
}