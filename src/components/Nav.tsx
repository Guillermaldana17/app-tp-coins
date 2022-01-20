import { NavLink } from 'react-router-dom'
import { Button, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useHistory } from "react-router-dom";

const { Item } = Menu;

function Nav() {
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUser({});
        history.push("/login")
    }

    return (
        <>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Item key={1}>
                    <NavLink
                        activeStyle={{ color: "red" }}
                        to="/home">Home
                    </NavLink>
                </Item>
                <Item key={2}>
                    <NavLink to="/list">Coin List</NavLink>
                </Item>
                <Item key={3}>
                    <NavLink to="/about">Task List</NavLink>
                </Item>
                <Item key={4}>
                    <NavLink to="/forms">Forms</NavLink>
                </Item>
                <Item key={5}>
                    <Button
                        shape="circle"
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={() => logout()}
                    />
                </Item>
            </Menu>
        </>
    )
}

export default Nav
