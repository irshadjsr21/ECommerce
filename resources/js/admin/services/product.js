import http from '../../http';
import { stringify } from 'querystring';

const baseUrl = window.adminPath + '/product';

export async function addProduct(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(baseUrl, body, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
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

export async function getProducts(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const queryString = query ? '?' + stringify(query) : '';
      const res = await http.get(baseUrl + queryString);
      if (res && res.data) {
        resolve(res.data);
      } else {
        throw new Error('No data');
      }
    } catch (error) {
      reject(error);
    }
  });
}
