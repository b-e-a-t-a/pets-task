import axios from "axios";

export const fetchPetsByStatus = (status) => {
  return axios.get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status.value}`);
};
