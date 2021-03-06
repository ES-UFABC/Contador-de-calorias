import { useState, useEffect, useCallback } from "react";
import { Api } from "../../services/api";
import { Select, DatePicker, message } from "antd";
import {FaTrash, FaPlus, FaMinus} from 'react-icons/fa';
import { List, Button } from "./styles";
import "./styles-home.css";
import moment from "moment";

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

export interface Answer{
    Calorias_de_Carboidratos_Ideal_Kcal: number,
    Calorias_de_Gorduras_Ideal_Kcal: number,
    Calorias_de_Proteinas_Ideal_Kcal: number,
    Quantidade_de_Carboidratos_Ideal_g: number,
    Quantidade_de_Gorduras_Ideal_g: number,
    Quantidade_de_Proteinas_Ideal_g: number,
    Taxa_metabolica_Basal_Kcal: number,
    Variação_de_Carboidratos_Kcal: number,
    Variação_de_Carboidratos_g: number,
    Variação_de_Gorduras_Kcal: number,
    Variação_de_Gorduras_g: number,
    Variação_de_Proteinas_Kcal: number,
    Variação_de_Proteinas_g: number,
    imc: number
}

export default function Home(){
    const [allFoods,setAllFoods] = useState<IFood[]>([]);
    const [myFoods, setMyFoods] = useState<IMyFood[]>([]);
    const [gambiarra,setGambiarra] = useState(1);
    const [answer, setAnswer] = useState<Answer>();
    const [date, setDate] = useState(moment(new Date()));

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
        if(myFoods.find(r => r.name === e)){
            message.error('Food already selected');
            return;
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
            console.log(JSON.stringify(request, null, 2))
            setAnswer(request.data);
        }catch(error){
            throw new Error('Falha ao solicitar calculo');
        }
    }

    async function handleSave(){
        const chosenDate = date.format('YYYY-MM-DD');
        const dataSend = {
            myFoods,
            chosenDate,
            //answer,
        };
        console.log(JSON.stringify(dataSend, null, 2))
        try{
            const request = await Api.post('saveMeal',dataSend,authorization);
            //console.log(request.status)
            //console.log(request)
            //setAnswer(request.data);
            message.info('Saved')
        }catch(error){
            throw new Error('Falha ao salvar refeição');
        }
    }
    
    const handleDateChange = (dateObj: moment.Moment|null): void => {
        if(dateObj !== null) setDate(dateObj);
    }
    console.log(date.format('YYYY-MM-DD'))

    //console.log(allFoods)
    //console.log(myFoods)
    //console.log('answer:')
    //console.log(answer)
    //console.log(JSON.stringify(answer, null, 2))

    return(
        <div className="style-home">
            <button className="calc" onClick={()=>{handleCalculate()}}>Calcular</button>
            <br/>
            <p><strong>Data da refeição: </strong></p>
            <DatePicker defaultValue={date} onChange={(e)=>handleDateChange(e)} /><br/><br/>
            <br/>
            <p><strong>Escolha de Alimentos</strong></p>
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
            <List className="box1">
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
            <button onClick={()=>{handleCalculate()}}>Calcular</button>
            <br/>
            <br/>
            {(answer !== undefined && answer !== null)?
            <div className="box2">
                <br/>
                <div className="box3">
                    <p><strong>IMC: </strong>{(answer.imc).toFixed(2)}</p>
                    <p><strong>Taxa metabólica basal (Kcal):</strong> {(answer.Taxa_metabolica_Basal_Kcal).toFixed(2)}</p>
                </div>
                <br/>
                <div className="box3">
                    <p><strong>Valores Consumidos </strong></p>
                    <p>Carboidratos: {(answer.Calorias_de_Carboidratos_Ideal_Kcal - answer.Variação_de_Carboidratos_Kcal).toFixed(2)} (Kcal) | {(answer.Quantidade_de_Carboidratos_Ideal_g - answer.Variação_de_Carboidratos_g).toFixed(2)} g</p>
                    <p>Gorduras: {(answer.Calorias_de_Gorduras_Ideal_Kcal - answer.Variação_de_Gorduras_Kcal).toFixed(2)} (Kcal) | {(answer.Quantidade_de_Gorduras_Ideal_g - answer.Variação_de_Gorduras_g).toFixed(2)} g</p>
                    <p>Proteínas: {(answer.Calorias_de_Proteinas_Ideal_Kcal - answer.Variação_de_Proteinas_Kcal).toFixed(2)} (Kcal) | {(answer.Quantidade_de_Proteinas_Ideal_g - answer.Variação_de_Proteinas_g).toFixed(2)} g</p>
                </div>
                <br/>
                <div className="box3">
                    <p><strong>Valores Ideais de Consumo</strong></p>
                    <p>Carboidratos: { answer.Calorias_de_Carboidratos_Ideal_Kcal } (Kcal) | {answer.Quantidade_de_Carboidratos_Ideal_g} g</p>
                    <p>Gorduras: {answer.Calorias_de_Gorduras_Ideal_Kcal} (Kcal) | {answer.Quantidade_de_Gorduras_Ideal_g} g</p>
                    <p>Proteínas: {answer.Calorias_de_Proteinas_Ideal_Kcal} (Kcal) | {answer.Quantidade_de_Proteinas_Ideal_g} g</p>
                </div>
                <br/>
                <button onClick={()=>{handleSave()}}>Salvar</button>
                <br/>
                <br/>
            </div>:<></>}

        </div>
    );
}
