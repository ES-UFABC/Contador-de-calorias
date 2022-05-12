import { Button, Form, Input, Row, message, Col, Select, InputNumber } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import { RegisterRequest } from "../../context/AuthProvider/util"
import './styles.css'
import logo from "../../assets/Logo-2.png";

export const Register = () =>{
    const auth = useAuth()
    const navigate = useNavigate();

    const { Option } = Select;

    async function onFinish(values:{userName:string,password:string,age:number,
    height:number,weight:number,gender:string}){
        try{
            await RegisterRequest(values.userName,values.password,values.age,
                values.height,values.weight,values.gender);

            await auth.authenticate(values.userName,values.password);

            navigate('/home');
        }catch(error){
            message.error('It was not possible to register a new user. Try again later');

            navigate('/login');
        }
    }

    function CancelHandle(){
        navigate('/login');
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
                    <h1>Cadastro</h1>
                </Form.Item>

                <Form
                name='basic'
                labelCol={{span:5}}
                wrapperCol={{span:16}}
                onFinish={onFinish}
                >
                    <Form.Item
                        label='Digite o usuário:'
                        name='userName'
                        rules={[{ required: true }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Digite a senha:'
                        name='password'
                        rules={[{ required: true }]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label='Digite sua idade:'
                        name='age'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={0} max={150} />
                    </Form.Item>
                    <Form.Item
                        label='Digite sua altura (cm):'
                        name='height'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={1} max={300} //step="0.01"
                         />
                    </Form.Item>
                    <Form.Item
                        label='Digite seu peso:'
                        name='weight'
                        rules={[{ required: true }]}
                    >
                        <InputNumber min={1} max={400} />
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
                        <Button type='primary' htmlType='submit'>Criar</Button>
                        <Button className="Button" type='primary' htmlType='button' onClick={CancelHandle}>Cancelar</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}