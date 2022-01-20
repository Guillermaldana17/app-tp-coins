import * as CustomService from '../CustomService'
import { ICoin } from "../interfaces/ListInterface";

// Acciones que se comunican con el reducer
export const startFetchCoins = () => ({ type: "FETCH_COINS" })
export const fetchCoinsOk = (coins: Array<ICoin>) => ({ type: "FETCH_OK", payload: coins })
export const fetchCoinFailure = (error: any) => ({ type: "FETCH_ERROR", payload: error })

export const fetchCollectionAsync = () => {
    return (dispatch: any) => {
        dispatch(startFetchCoins());
        CustomService.getTickers()
            .then(({ data }: { data: Array<ICoin> }) => {
                dispatch(fetchCoinsOk(data));
            }).catch((err: string) => {
                dispatch(fetchCoinFailure(err));
            })
    }
}
