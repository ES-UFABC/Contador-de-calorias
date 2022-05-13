import { useState, useEffect } from "react";
import { List, Button, Modal } from "antd";
import { FaTrash } from "react-icons/fa";
import { Api } from "../../services/api";
import "./styles-historic.css";

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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [meal, setMeal] = useState<IMeal>();

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    const showModal = (meal:IMeal) => {
        setMeal(meal);
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };

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
        <div className="style-back">
            <List>
                {meals.map(meal=>
                    <li key={meal.Refeicao_Numero}>
                        <span onClick={()=>{showModal(meal)}}>
                            <Button className="trash" onClick={()=>{}}>
                                <FaTrash size={14} />
                            </Button>
                            Refeição de: {meal.Data}
                        </span>
                    </li>
                )};
            </List>
            <Modal title={'Refeição de:'+ meal?.Data} visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
                <p>Peso Usuário: {meal?.Peso} kg</p>
                <p>Proteinas: {meal?.Proteinas} </p>
                <p>Carboidratos: {meal?.Carboidratos}</p> 
                <p>Gorduras: {meal?.Gorduras}</p> 
                <p>Calorias: {meal?.Calorias}</p> 
            </Modal>
        </div>
    );
}