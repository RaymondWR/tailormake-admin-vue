import axios from "axios";
import ENV from "../dev.env";

const HTTP = axios.create({
    baseURL: ENV.SERVER_URL,
    withCredentials: false,
    timeout: 60000
});

export default {
  postNewSalepost(post) {

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    return HTTP.post('/saleposts/new', post, config);
  }
}
