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
    prot_val: number,
    unity: string
}
export interface IMyFood extends IFood{
    quantidade: number
}

/*export interface Answer{
    Calorias de Carboidratos Ideal (Kcal)": 991
    Calorias de Gorduras Ideal (Kcal)": 594
    Calorias de Proteinas Ideal (Kcal)": 396
    Quantidade de Carboidratos Ideal (g)": 247.75
    Quantidade de Gorduras Ideal (g)": 220.27
    Quantidade de Proteinas Ideal (g)": 495.6
    Taxa metabolica Basal (Kcal)": 1982.3999999999999
    Variação de Carboidratos (Kcal)": 932
    Variação de Carboidratos (g)": 233
    Variação de Gorduras (Kcal)": 554.85
    Variação de Gorduras (g)": 215.65
    Variação de Proteinas (Kcal)": 
    Variação de Proteinas (g)": 
}*/

export default function Home(){
    const [allFoods,setAllFoods] = useState<IFood[]>([]);
    const [myFoods, setMyFoods] = useState<IMyFood[]>([]);
    const [gambiarra,setGambiarra] = useState(1);
    const [answer, setAnswer] = useState([]);

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
            unity: food.unity,
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
        if(repo.quantidade >1) repo.quantidade -= 1; 
    },[gambiarra]);

    useEffect(()=>{
    async function chargeFoods(){
        const response = await Api.get("getFoods",authorization);
        setAllFoods(response.data);
    } 
    
    chargeFoods();
    },[]);

    async function handleCalculate(){
        const data = {
            myFoods,
        };
        //console.log(JSON.stringify(data, null, 2))
        try{
            const request = await Api.post('registerFood',data,authorization);
            //console.log(myFoods)
            console.log(request)
            setAnswer(request.data);
        }catch(error){
            throw new Error('Falha ao solicitar calculo');
        }
    }

    //console.log(allFoods)
    //console.log(myFoods)
    console.log('answer:')
    console.log(answer)
    console.log(JSON.stringify(answer, null, 2))

    return(
        <div>
            <h1>Home</h1>
            <button onClick={()=>{handleCalculate()}}>Calcular</button>
            <br/>
            <br/>
            <Select  
                onChange={e=>handleInputChange(e)}
                style={{ width: 250 }}>
            
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
                            {food.name} ( {food.unity} )
                        </span>
                    </li>
                ))}
            </List>
            
            {(answer !== undefined && answer !== null)?
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Password</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answer.map(function (element) {
                        return (
                            <tr>
                            <td>{ element }</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>:<></>}

        </div>
    );
}
/*{(answer !== undefined && answer !== null)?
            <div>
                <table>
                    <thead>
                        <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Password</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {answer.map(item => {
                        return (
                            <tr key={item.password}>
                            <td>{ item.firstname }</td>
                            <td>{ item.lastname }</td>
                            <td>{ item.password }</td>
                            <td>{ item.email }</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>:<></>} */