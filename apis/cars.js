import axios from "axios";
import ENV from "../dev.env";

const HTTP = axios.create({
    baseURL: ENV.SERVER_URL,
    withCredentials: false,
    timeout: 60000
});

export default {
  listAllCars() {
    return HTTP.get('/cars/list')
  },
  postNewCar(car) {
    return HTTP.post('/cars/new', car)
  }
}