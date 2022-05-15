import { Button, Form, Input, Row, message, Col } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import './styles.css'
import logo from "../../assets/Logo-2.png";

export const Login = () =>{
    const auth = useAuth()
    const navigate = useNavigate();

    async function onFinish(values:{userName:string,password:string}){
        try{
            await auth.authenticate(values.userName,values.password)

            navigate('/home')
        }catch(error){
            message.error('Unable to login')
        }
    }

    function RegisterHandle(){
        navigate('/register');
    }                    

    return(
      
        <Row
        className="container3"
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
                    <h1>Contador de Calorias</h1>
                </Form.Item>
                
                <Form
                name='basic'
                labelCol={{span:5}}
                wrapperCol={{span:16}}
                onFinish={onFinish}
                >
                    
                    <Form.Item
                        label='Nome do Usuário'
                        name='userName'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Senha'
                        name='password'
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:5,span:16}}>
                        <Button type='primary' htmlType='submit'>Logar</Button>
                        
                        <Button className="Button" type='primary' htmlType='button' onClick={RegisterHandle}>Cadastrar</Button>
                    </Form.Item>
                    
                </Form>
            </Col>
        </Row>
    )
}