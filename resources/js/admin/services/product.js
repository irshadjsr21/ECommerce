import http from '../../http';
import { stringify } from 'querystring';

const baseUrl = window.adminPath + '/product';

export async function addProduct(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(baseUrl, body);
      if (res && res.data) {
        resolve(res.data.product);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}
