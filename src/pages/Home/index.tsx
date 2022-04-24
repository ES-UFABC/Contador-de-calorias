import { useState, useEffect, useCallback } from "react";
import { Api } from "../../services/api";
import { Select } from "antd";
import {FaTrash, FaPlus, FaMinus} from 'react-icons/fa';
import { List, Button } from "./styles";

export interface IFood{
    name: string,
    cal_val: number,
    carbo_val: number,
    lip_val: number,
    prot_val: number
}
export interface IMyFood extends IFood{
    quantidade: number
}

export default function Home(){
    const [allFoods,setAllFoods] = useState<IFood[]>([]);
    const [myFoods, setMyFoods] = useState<IMyFood[]>([]);
    const [gambiarra,setGambiarra] = useState(1);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    function handleInputChange(e:string){
        const food = allFoods.find(r => r.name === e);
        if(!food){
            throw new Error('Falha ao carregar');
        }
        const data: IMyFood = {
            name: food.name,
            cal_val: food.cal_val,
            carbo_val: food.carbo_val,
            lip_val: food.lip_val,
            prot_val: food.prot_val,
            quantidade: 1
        }
        setMyFoods([...myFoods,data]);
    }

    const handleDelete = useCallback((repo)=>{
        const find = myFoods.filter(r => r.name !== repo);
        setMyFoods(find);
    },[myFoods]);

    const handlePlus = useCallback((repo)=>{
        setGambiarra(gambiarra+1);
        repo.quantidade += 1; 
    },[gambiarra]);

    const handleMinus = useCallback((repo)=>{
        setGambiarra(gambiarra-1);
        if(repo.quantidade >=1)
        repo.quantidade -= 1; 
    },[gambiarra]);

    useEffect(()=>{
    async function chargeFoods(){
        const response = await Api.get("getFoods",authorization);
        setAllFoods(response.data);
    } 
    chargeFoods();
    },[]);
    console.log('1---')
    console.log(allFoods)
    console.log(myFoods)
    console.log('2---')
    return(
        <div>
            <h1>Home</h1>
            <button>Calcular</button>
            <br/>
            <br/>
            <Select  onChange={e=>handleInputChange(e)}>
            
                {allFoods.map(food =>
                <Select.Option key={food.name} 
                               value={food.name} 
                               >
                    {food.name}
                </Select.Option>
                )};
            </Select>
            <List>
                {myFoods.map(food=>(
                    <li key={food.name}>
                        <span>
                            <Button onClick={()=>handleMinus(food)}>
                                <FaMinus size={14} />
                            </Button>
                            {food.quantidade}
                            <Button onClick={()=>handlePlus(food)}>
                                <FaPlus size={14} />
                            </Button>
                            <Button onClick={()=>handleDelete(food.name)}>
                                <FaTrash size={14} />
                            </Button>
                            {food.name}
                        </span>
                    </li>
                ))}
            </List>
        </div>
    );
}