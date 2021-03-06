import { useState, useEffect } from "react";
import { List, Button, Modal, message } from "antd";
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

      async function handleDelete(id:number){
          const data = {
              id,
          }
                try{
                    console.log('data:')
                    //console.log(data)
                    //console.log(JSON.stringify(data, null, 2))
                    await Api.post('dropMeal',data,authorization);
                    window.location.reload(); 
                }catch(error){
                    message.error('Failed to delete the meal')
                }
            }

    useEffect(()=>{
        async function chargeMeals(){
            const response = await Api.get("getMeals",authorization);
            //console.log(JSON.stringify(response.data, null, 2))
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
                        <Button className="trash" onClick={()=>handleDelete(meal.Refeicao_Numero)}>
                            <FaTrash size={14} />
                        </Button>
                        <span className="mealList" onClick={()=>{showModal(meal)}}>
                            
                            Refei????o de: {meal.Data}
                        </span>
                    </li>
                )};
            </List>
            <Modal title={'Refei????o de: '+ meal?.Data} visible={isModalVisible} onOk={handleOk} onCancel={handleOk}>
                <p>Peso Usu??rio: {meal?.Peso} kg</p>
                <p>Proteinas: {meal?.Proteinas} g</p>
                <p>Carboidratos: {meal?.Carboidratos} g</p> 
                <p>Gorduras: {meal?.Gorduras} g</p> 
                <p>Calorias: {meal?.Calorias}</p> 
            </Modal>
        </div>
    );
}