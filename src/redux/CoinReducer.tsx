import initialState from './InitialState';

export enum ReducerTypes {
    ADD = "ADD",
    REMOVE = "REMOVE",
    RESET = "RESET"
}

const CoinReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "ADD":
            return { ...state, favorites: [...state.favorites, action.payload] };
        case "REMOVE":
            const favoritesFiltered = state.favorites.filter(item => item.id !== action.payload.id);
            return { ...state, favorites: [...favoritesFiltered] };
        case "RESET":
            return { ...state, favorites: [] };
        case "FETCH_COINS":
            return { ...state, loading: true, errorMessage: "" };
        case "FETCH_OK":
            return { ...state, loading: false, coins: action.payload };
        case "FETCH_ERROR":
            return { ...state, loading: false, coins: [], errorMessage: action.payload };
        default:
            return state;
    }
};
export default CoinReducer;
