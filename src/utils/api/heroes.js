import { axios } from '@/core';

export default {
  getStaff: () => axios.post('/heroes/get')
}