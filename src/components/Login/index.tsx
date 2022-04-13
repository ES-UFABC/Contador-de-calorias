import { Button, Form, Input, Row, message, Col } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import './styles.css'

export const Login = () =>{
    const auth = useAuth()
    const navigate = useNavigate();
    async function onFinish(values:{userName:string,password:string}){
        try{
            await auth.authenticate(values.userName,values.password)

            navigate('/profile')
        }catch(error){
            message.error('Invalid UserName or password')
        }
    }

    function RegisterHandle(){
        navigate('/register');
    }

    return (
        <Row
        justify="center"
        align="middle"
        style={{
            height: '100vh'
        }}>
            <Col span={12}>
                <Form
                name='basic'
                labelCol={{span:8}}
                wrapperCol={{span:16}}
                onFinish={onFinish}
                >
                    <Form.Item
                        label='UserName'
                        name='userName'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:8,span:16}}>
                        <Button type='primary' htmlType='submit'>Sign In</Button>
                        
                        <Button type='primary' htmlType='button' onClick={RegisterHandle}>Sign Up</Button>
                    </Form.Item>
                    
                </Form>
            </Col>
        </Row>
    )
}