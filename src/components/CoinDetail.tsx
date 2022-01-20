import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import * as CustomService from "../CustomService";
import NotFoundComponent from './NotFoundComponent';

function CoinDetail() {
    const { id }: { id: string | undefined } = useParams();
    const [coinDetail, setCoinDetail] = useState<any>();

    useEffect(() => {
        CustomService.getSpecificTicker(id)
            .then((data: any) => {
                setCoinDetail(data);
            }).catch(err => {
                setCoinDetail(undefined);
            })
    }, [id])

    return (
        <>
            {coinDetail === undefined || coinDetail === "" ?
                <NotFoundComponent /> : <>{JSON.stringify(coinDetail)} </>
            }
        </>
    )
}

export default CoinDetail
