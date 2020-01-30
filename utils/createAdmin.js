const { User } = require('../models');
const { ADMIN } = require('../config');

module.exports = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const existingAdmin = await User.findOne({
        where: { type: User.TYPES.admin }
      });
      if (existingAdmin) {
        console.log('Admin already Exists.');
      } else {
        const userWithAdminEmail = await User.findOne({
          where: { email: ADMIN.EMAIL }
        });
        if (userWithAdminEmail) {
          throw new Error('User with admin email already exists.');
        } else {
          await User.create({
            firstName: ADMIN.FIRST_NAME,
            lastName: ADMIN.LAST_NAME,
            email: ADMIN.EMAIL,
            password: ADMIN.PASSWORD,
            type: User.TYPES.admin
          });
          console.log('New Admin created');
        }
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
