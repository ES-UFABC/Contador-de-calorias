import { useState, useEffect } from "react";
import { Api } from "../../services/api";
import { Select } from "antd";

export interface IFood{
    name: string,
    cal_val: number,
    carbo_val: number,
    lip_val: number,
}

export default function Home(){
    const [foods,setFoods] = useState<IFood[]>([]);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    function handleChange(){
        console.log('item selected')
    }

   useEffect(()=>{
    async function chargeFoods(){
        const response = await Api.get("getFoods",authorization);
        setFoods(response.data);
    }
    
    chargeFoods();
    },[]);
    console.log(foods)
    return(
        <div>
            <h1>Home</h1>
            {/* foods.map((result)=>(<option>{result.data}</option>)) */}
            <Select  onChange={handleChange} defaultValue="Escolha um Alimento">
                {foods.map(food =>
                <Select.Option key={food.name} value={food.name}>{food.name}</Select.Option>
                )};
            </Select>
        </div>
    );
}