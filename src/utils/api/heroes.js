import { axios } from '@/core';

export default {
  getStaff: () => axios.post('/heroes/get'),
  dropData: (pass) => axios.post('/heroes/drop', pass)
}