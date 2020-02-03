import http from '../../http';
import { stringify } from 'querystring';

const baseUrl = window.adminPath + '/category';

export async function getCategoryOptions() {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.get(baseUrl + '/parent-options');
      if (res && res.data) {
        const categories = res.data.categories;
        resolve(categories);
      } else {
        throw new Error('No data');
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function addCategory(body) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await http.post(baseUrl, body);
      if (res && res.data) {
        const category = res.data.category;
        resolve(category);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function getCategory(query) {
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
