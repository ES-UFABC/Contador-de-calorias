import { useState, useEffect } from "react";
import { List, Button } from "antd";
import { FaTrash } from "react-icons/fa";
import { Answer } from "../Home";
import { Api } from "../../services/api";

export interface MyAnswer extends Answer{
    date: string,
}

export default function Historic(){
    const [meals,setMeals] = useState<MyAnswer[]>([]);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    useEffect(()=>{
        async function chargeFoods(){
            const response = await Api.get("getMeals",authorization);
            setMeals(response.data);
        } 
        
        chargeFoods();
        },[]);

    return(
        <div>
            <List>
                {meals.map(meal=>(
                    <li key={meal.date}>
                        <span>
                            <Button onClick={()=>{}}>
                                <FaTrash size={14} />
                            </Button>
                            Refeição de: {meal.date}
                        </span>
                    </li>
                ))}
            </List>
        </div>
    );
}