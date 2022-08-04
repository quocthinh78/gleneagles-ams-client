import Axios from "axios";

const apiInstance = Axios.create({
  baseURL: process.env.REACT_APP_API_SECRET,
});

export default apiInstance;

export const swrFetcher = (url) => apiInstance.get(url).then((res) => res.data);
