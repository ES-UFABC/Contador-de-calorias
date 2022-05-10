import { Button, Form, Input, Row, message, Col, Select, InputNumber } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import { RegisterRequest } from "../../context/AuthProvider/util"
import './styles.css'
import logo from "../../assets/Logo-2.png";

export const EditUser = () =>{
    const auth = useAuth()
    const navigate = useNavigate();

    const userName = localStorage.getItem('userName');

    const { Option } = Select;

    async function onFinish(values:{userName:string,password:string,age:number,
    height:number,weight:number,gender:string}){
        try{
            await RegisterRequest(values.userName,values.password,values.age,//mudar metodo pra EditUserRequest
                values.height,values.weight,values.gender);

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
                        initialValue={userName}
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
                        rules={[{ required: true }]}
                    >
                        <InputNumber value={'user.age'}/>
                    </Form.Item>
                    <Form.Item
                        label='Altura:'
                        name='height'
                        rules={[{ required: true }]}
                    >
                        <InputNumber value={'user.height'}/>
                    </Form.Item>
                    <Form.Item
                        label='Peso:'
                        name='weight'
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
    )
}