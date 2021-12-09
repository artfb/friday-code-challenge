import axios from 'axios';
import { API_URL } from '../constants';

export const getMakes = async () => {
  const { data } = await axios.get(`${API_URL}/api/makes`);
  return data;
}

export const getModels = async (make) => {
  const { data } = await axios.get(`${API_URL}/api/models?make=${make}`);
  return data;
}

export const getVehicles = async (make, model) => {
  const { data } = await axios.get(`${API_URL}/api/vehicles?make=${make}&model=${model}`);
  return data;
}
