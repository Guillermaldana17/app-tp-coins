import axios from "axios";
import { notification } from "antd";

const CustomAxios = axios.create({
  baseURL: "https://api.coinlore.net/api/",
  //    timeout: 1000,
  //headers: {'Authorization': 'bearer asdljasdlkas'}
});

CustomAxios.interceptors.request.use(
  function (config) {
    //console.log("Antes de salir: ");
    //console.log(config);
    return config;
  },
  function (error) {
    //console.log("Error Antes de salir: ");
    //console.log(error);
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  function (response) {
    if(response.status === 403) {
      notification.warning({
        message: "Inicie sesión",
      });
      //redirect al login
    }
    if (response.data === "") {
      notification.warning({
        message: "Error",
        description: "No se encontró información",
      });
    }
    return response.data;
  },
  function (error) {
    notification.error({
      message: "Error",
      description: "Ocurrió un error",
    });
    return Promise.reject(error);
  }
);

export { CustomAxios };
