import { CustomAxios } from "./CustomAxios";

//https://www.coinlore.com/cryptocurrency-data-api
export const getTickers = () => {
  return CustomAxios.get("tickers/");
};

export const getSpecificTicker = id => {
  return CustomAxios.get(`ticker/?id=${id}`);
};
