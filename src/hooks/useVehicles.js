import axios from 'axios';
import { useQuery } from "react-query";

export const getMakes = async () => {
  const { data } = await axios.get('http://localhost:8080/api/makes');
  return data;
}

export const getModels = async (make) => {
  const { data } = await axios.get(`http://localhost:8080/api/models?make=${make}`);
  return data;
}

export const getVehicles = async (make, model) => {
  const { data } = await axios.get(`http://localhost:8080/api/vehicles?make=${make}&model=${model}`);
  return data;
}

export const useVehiclesModels = (make) => {
  return useQuery(['models', make], () => getModels(make), { enabled: !!make });
}

export const useVehiclesDetails = (make, model) => {
  return useQuery(['models', make, model], () => getVehicles(make, model), { enabled: !!make && !!model });
}
