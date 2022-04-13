import { Button, Form, Input, Row, message, Col } from "antd"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider/useAuth"
import { LoginRequest } from "../../context/AuthProvider/util"
import './styles.css'

export const Register = () =>{
    const auth = useAuth()
    const navigate = useNavigate();
    async function onFinish(values:{userName:string,password:string}){
        try{
            await LoginRequest(values.userName,values.password);

            await auth.authenticate(values.userName,values.password);

            navigate('/profile');
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
                        label='Digit the username:'
                        name='userName'
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Digit the password:'
                        name='password'
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset:8,span:16}}>
                        <Button type='primary' htmlType='submit'>Create</Button>
                        <Button type='primary' htmlType='button' onClick={CancelHandle}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}