import { Button, Form, Input, Row, message, Col, Select, InputNumber } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import './styles.css'
import logo from "../../assets/Logo-2.png";
import { useState, useEffect } from "react";
import { Api } from "../../services/api";
import { setUserData } from "../../context/AuthProvider/util";

export interface User{
    userName: string,
    weight: number,
    height: number,
    age: number,
    gender:string,
    id:number
}

export const EditUser = () =>{
    const auth = useAuth()
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `${token}`
        }
    }

    useEffect(()=>{
        async function chargeFoods(){
            const response = await Api.get("getUserData",authorization);
            setUser(response.data);
        } 
        
        chargeFoods();
        },[]);
        console.log(user)
    const { Option } = Select;

    async function onFinish(values:{userName:string,password:string,age:number,
    height:number,weight:number,gender:string}){

        try{
            await setUserData(values.userName,values.password,values.age,
                values.height,values.weight,values.gender,token);

            await auth.authenticate(values.userName,values.password);

            navigate('/home');
        }catch(error){
            message.error('It was not possible to edit your register. Try again later');

            navigate('/home');
        }
    }

    function CancelHandle(){
        navigate('/home');
    }

    return (
        <div>
            {user !== undefined ?
        <Row
        className="container2"
        justify="center"
        align="middle"
        style={{
            height: '100vh'
        }}>
            <Col span={12}>

                <Form.Item className="imagbox">
                    <img className="imag" src={logo} alt="Logo"/>
                </Form.Item>

                <Form.Item className="titulo">
                    <h1>Alteração de Dados Cadastrais</h1>
                </Form.Item>

                <Form
                name='basic'
                labelCol={{span:5}}
                wrapperCol={{span:16}}
                onFinish={onFinish}
                >
                    <Form.Item
                        label='Nome do usuário:'
                        name='userName'
                        initialValue={user?.userName}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='Senha:'
                        name='password'
                        rules={[{ required: true }]}
                    >
                        <Input.Password value={'user.password'}/>
                    </Form.Item>
                    <Form.Item
                        label='Idade:'
                        name='age'
                        initialValue={user?.age}
                        rules={[{ required: true }]}
                    >
                        <InputNumber value={'user.age'}/>
                    </Form.Item>
                    <Form.Item
                        label='Altura (cm):'
                        name='height'
                        initialValue={user?.height}
                        rules={[{ required: true }]}
                    >
                        <InputNumber value={'user.height'}/>
                    </Form.Item>
                    <Form.Item
                        label='Peso:'
                        name='weight'
                        initialValue={user?.weight}
                        rules={[{ required: true }]}
                    >
                        <InputNumber value={'user.weight'}/>
                    </Form.Item>
                    <Form.Item name="gender" label="Gênero" rules={[{ required: true }]}>
                        <Select
                        placeholder="Select a option and change input text above"
                        onChange={()=>{}}
                        allowClear
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            {/*<Option value="other">other</Option>*/}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:5,span:16}}>
                        <Button type='primary' htmlType='submit'>Alterar</Button>
                        <Button className="Button" type='primary' htmlType='button' onClick={CancelHandle}>Cancelar</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        :<></>}
        </div>
    )
}