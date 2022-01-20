import { ICoin } from "../interfaces/ListInterface";
import { useSelector } from 'react-redux';
import { State } from "../redux/InitialState";
import { List, Card, Typography } from 'antd';
import { Link } from 'react-router-dom'

const {Paragraph} = Typography;

function FavoriteList() {
    const appCoinList = useSelector((state: State) => state.favorites);

    return (
        <>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={appCoinList}
                renderItem={(item: ICoin) => (
                    <List.Item>
                        <Card title={<Link to={`/list/${item.id}`}>
                            {item.symbol}
                        </Link>}>
                            <Paragraph>BTC:{item.price_btc}</Paragraph>
                            <Paragraph>USD:{item.price_usd}</Paragraph>
                        </Card>
                    </List.Item>
                )}
            /></>
    )
}

export default FavoriteList;
