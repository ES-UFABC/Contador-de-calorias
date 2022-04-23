import { useState, useEffect, SetStateAction } from "react";
import { Api } from "../../services/api";
import { Select } from "antd";
import {FaTrash} from 'react-icons/fa';
import { List, DeleteButton } from "./styles";

export interface IFood{
    name: string,
    cal_val: number,
    carbo_val: number,
    lip_val: number,
}

export default function Home(){
    const [allFoods,setAllFoods] = useState<IFood[]>([]);
    const [myFoods, setMyFoods] = useState<IFood[]>([]);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    //function handleInputChange(e: SetStateAction<IFood[]>){
    /*function handleInputChange(e:IFood){
        console.log('1---')
        console.log(e)
        //console.log(e.target)
        //console.log(e.target.value)
        console.log('2---')
        setMyFoods([...myFoods,e]);
    }*/
    function handleInputChange(e:string){
        const food = allFoods.find(r => r.name === e);
        if(!food){
            throw new Error('Repositório já escolhido');
        }
        setMyFoods([...myFoods,food]);
    }


   useEffect(()=>{
    async function chargeFoods(){
        const response = await Api.get("getFoods",authorization);
        setAllFoods(response.data);
    } 
    chargeFoods();
    },[]);
    console.log('3---')
    console.log(allFoods)
    console.log(myFoods)
    console.log('4---')
    return(
        <div>
            <h1>Home</h1>
            <Select  onChange={e=>handleInputChange(e)}>
            
                {allFoods.map(food =>
                <Select.Option key={food.name} 
                               value={food.name} 
                               >
                    {food.name}
                    {/*<button onClick={()=>handleInputChange(food)}>+</button>*/}
                </Select.Option>
                )};
            </Select>
            <List>
                {myFoods.map(food=>(
                    <li key={food.name}>
                        <span>
                            <DeleteButton onClick={()=>{}}>
                                <FaTrash size={14} />
                            </DeleteButton>
                            {food.name}
                        </span>
                    </li>
                ))}
            </List>
        </div>
    );
}