import { ICoin } from '../interfaces/ListInterface';

export interface State {
    favorites: Array<ICoin>;
    coins: Array<ICoin>;
    counter: number;
    loading: boolean;
    errorMessage: string;
} 

const initialState: State = {
    favorites: [], 
    coins: [], 
    counter: 0,
    loading: true,
    errorMessage: "" 
}

export default initialState;