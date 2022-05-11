import { useState, useEffect } from "react";
import { List, Button } from "antd";
import { FaTrash } from "react-icons/fa";
import { Answer } from "../Home";
import { Api } from "../../services/api";

export interface Meal{
    Refeicao_Numero: number, 
    Peso: number, 
    Proteinas: number, 
    Carboidratos: number, 
    Gorduras: number, 
    Calorias: number, 
    Data: string
}

export default function Historic(){
    const [meals,setMeals] = useState<Meal[]>([]);

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
        console.log(meals)
    return(
        <div>
            <List>
                {meals.map(meal=>(
                    <li key={meal.Refeicao_Numero}>
                        <span>
                            <Button onClick={()=>{}}>
                                <FaTrash size={14} />
                            </Button>
                            Refeição de: {meal.Data}
                        </span>
                    </li>
                ))}
            </List>
        </div>
    );
}