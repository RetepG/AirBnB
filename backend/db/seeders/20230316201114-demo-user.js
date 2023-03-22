'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        email: 'demo@user.io',
        firstName: 'peter',
        lastName: 'guans',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        id: 2,
        email: 'user1@user.io',
        firstName: 'petr',
        lastName: 'gua',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        id: 3,
        email: 'user2@user.io',
        firstName: 'pe',
        lastName: 'gu',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        id: 4,
        email: 'user3@user.io',
        firstName: 'peterr',
        lastName: 'gun',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        id: 5,
        email: 'user4@user.io',
        firstName: 'petee',
        lastName: 'guan',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'FakeUser3', 'FakeUser4'] }
    }, {});
  }
};
