import { useState, useEffect } from "react";
import { List, Button } from "antd";
import { FaTrash } from "react-icons/fa";
import { Answer } from "../Home";
import { Api } from "../../services/api";

export interface IMeal{
    Refeicao_Numero: number, 
    Peso: number, 
    Proteinas: number, 
    Carboidratos: number, 
    Gorduras: number, 
    Calorias: number, 
    Data: string
}

export default function Historic(){
    const [meals,setMeals] = useState<IMeal[]>([]);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    useEffect(()=>{
        async function chargeMeals(){
            const response = await Api.get("getMeals",authorization);
            console.log(JSON.stringify(response.data, null, 2))
            setMeals(response.data);
        } 
        chargeMeals();
        },[]);

        console.log(meals)
        console.log(typeof(meals))
    return(
        <div>
            <List>
                {meals.map(meal=>
                    <li key={meal.Refeicao_Numero}>
                        <span>
                            <Button onClick={()=>{}}>
                                <FaTrash size={14} />
                            </Button>
                            Refeição de: {meal.Data}
                        </span>
                    </li>
                )};
            </List>
        </div>
    );
}