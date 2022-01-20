import { useEffect, useState } from "react";
import * as CustomService from "../CustomService";
import { Link } from 'react-router-dom'
import { List, Card, Space, Typography, Button } from 'antd';
import {
    LikeOutlined, DislikeOutlined, StarTwoTone
} from '@ant-design/icons';
import { ICoin } from "../interfaces/ListInterface";
import { useDispatch, useSelector } from 'react-redux';
import { ReducerTypes } from "../redux/CoinReducer";
import { connect } from 'react-redux';
import { fetchCollectionAsync } from "../redux/CoinActions";

const { Paragraph } = Typography;

const CoinList = (props: any) => {

    const dispatch = useDispatch();
    const { favorites: appCoinList } = props;

    useEffect(() => {
        dispatch(fetchCollectionAsync());
    }, []);

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
                dataSource={props.coins}
                loading={props.loading}
                renderItem={(item: ICoin) => (
                    <List.Item>
                        <Card title={<Link to={`/list/${item.id}`}>
                            {item.symbol}
                        </Link>}>
                            <Paragraph>BTC:{item.price_btc}</Paragraph>
                            <Paragraph>USD:{item.price_usd}</Paragraph>
                            <Space direction="horizontal">
                                {appCoinList.findIndex((coin: ICoin) => coin.id === item.id) === -1 ?
                                    <Button
                                        icon={<StarTwoTone twoToneColor="yellow" />}
                                        onClick={() => props.addFavCoin(item)}>
                                    </Button>
                                    :
                                    <Button
                                        icon={<StarTwoTone twoToneColor="red" />}
                                        onClick={() => props.deleteFavCoin(item)}>
                                    </Button>
                                }
                            </Space>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )
}

const mapStateToProps = (state: any) => {
    return ({ favorites: state.coin.favorites, loading: state.coin.loading, coins: state.coin.coins, tasks: state.task.tasks });
}

const mapDispatchToProps = (dispatch: any) => ({
    addFavCoin: (coin: ICoin) => dispatch({ type: ReducerTypes.ADD, payload: coin }),
    deleteFavCoin: (coin: ICoin) => dispatch({ type: ReducerTypes.REMOVE, payload: coin })
})

const mergeProps = (stateProps: any, dispatchProps: any, ownProps: any) => {
    return { ...ownProps, ...stateProps, ...dispatchProps }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CoinList);
