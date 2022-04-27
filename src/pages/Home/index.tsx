import { useState, useEffect } from "react";
import { Api } from "../../services/api";

export default function Home(){
    const [foods,setFoods] = useState([]);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

   useEffect(()=>{
    async function chargeFoods(){
        const response = await Api.get("getFoods",authorization);
        setFoods(response.data);
        console.log(response);
        console.log(response); 
    }
    
    chargeFoods();
    },[]);

    return(
        <div>
            <h1>Home</h1>
            <h2>teste</h2>
            <section>
                <option>Foods List</option>
            </section>
            

        </div>
    );
}