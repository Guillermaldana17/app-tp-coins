import { Button, notification, Tabs, Form, Input } from 'antd'
import firebase from 'firebase';
import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { UserContext } from '../context/UserContext';
import { googleAuthProvider } from '../firebase/FirebaseConfig';

const { TabPane } = Tabs;
interface UserAuth {
    email: string;
    password: string;
}

interface Props {
    history: any;
}

function Login({ history }: Props) {

    const { user, setUser } = useContext(UserContext);

    const signInWithGoogle = () => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL
                }
                setUser(userData);
                history.push("/about")
            }).catch((err) => {
                notification.error({ message: err.message });
            });
    }

    const registerUser = ({ email, password }: UserAuth) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.email,
                    image: ""
                }
                setUser(userData);
                history.push("/about")
            })
            .catch(e => {
                notification.error({ message: e.message });
            })
    }

    const loginUser = ({ email, password }: UserAuth) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                const userData = {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.email,
                    image: ""
                }
                setUser(userData);
                history.push("/about")
            })
            .catch(e => {
                notification.error({ message: e.message });
            })
    }

    return (
        <>
            {user?.uid !== undefined && <Redirect to="/about" />}

            <Tabs defaultActiveKey="1">
                <TabPane tab="Iniciar Sesión Con Google" key="1">
                    <Button type="primary" onClick={() => signInWithGoogle()}>Sign In Google</Button>
                </TabPane>
                <TabPane tab="Iniciar Sesión Usuario y Contraseña" key="2">
                    <Form onFinish={loginUser}>
                        <Form.Item name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password placeholder="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Iniciar Sesión</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Registrarme" key="3">
                    <Form onFinish={registerUser}>
                        <Form.Item name="email">
                            <Input placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password placeholder="password" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">Registrar Usuario</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </>
    )
}

export default Login
