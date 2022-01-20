import "./App.css";
import CoinList from "./components/CoinList";
import About from "./components/About";
import CoinDetail from "./components/CoinDetail";
import NotFoundComponent from "./components/NotFoundComponent";
import Nav from "./components/Nav";
import { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import 'antd/dist/antd.css'
import FavoriteList from "./components/FavoriteList";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import Forms from "./components/Forms";

const { Header, Content, Footer } = Layout;

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <Router>
        <Layout className="layout">
          <Header>
            <Nav />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Switch>
                <Route path="/home" component={FavoriteList} />
                <Route path="/about/:other" component={About} />
                <Route path="/about">
                  {user?.uid !== undefined ? <About /> : <Redirect to="/login" />}
                </Route>
                <Route exact path="/list" component={CoinList} />
                <Route path="/list/:id" component={CoinDetail} />
                <Route path="/login" component={Login}/>
                <Route path="/forms" component={Forms}/>)
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Router>
    </>
  );
}

export default App;
