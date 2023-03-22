'use strict';

const { User, Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    //Retreive users from users table setting it to id
    // const users = await User.findAll();
    // const userId = [];

    // for (let i = 0; i < users.length; i++) {
    //   const user = users[i];
    //   userId.push({ username: user.username, id: user.id });
    // }

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        // ownerId: userId[0].id,
        ownerId: 1,
        address: '123 Main Street',
        city: 'New York City',
        state: 'New York',
        country: 'USA',
        lat: 40.7128,
        lng: 74.0060,
        name: 'Cozy Apartment',
        description: 'A small and comfortable apartment in the heart of the city.',
        price: 100.52,
      },
      {
        // ownerId: userId[1].id,
        ownerId: 2,
        address: '456 Elm Street',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7749,
        lng: 122.4194,
        name: 'Luxury Penthouse',
        description: 'A spacious and luxurious penthouse with stunning city views.',
        price: 500.32,
      },
      {
        // ownerId: userId[2].id,
        ownerId: 3,
        address: '789 Oak Street',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 51.5074,
        lng: 0.1278,
        name: 'Charming Townhouse',
        description: 'A beautiful and charming townhouse located in a quiet neighborhood.',
        price: 200.12,
      },
      {
        // ownerId: userId[3].id,
        ownerId: 4,
        address: '321 Pine Street',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25.7617,
        lng: 80.1918,
        name: 'Beachfront Condo',
        description: 'A modern and stylish condo with stunning ocean views.',
        price: 300.50,
      },
      {
        ownerId: userId[4].id,
        ownerId: 5,
        address: '123 Gold Street',
        city: 'Monterey Park',
        state: 'California',
        country: 'USA',
        lat: 50.1234,
        lng: 60.1234,
        name: 'Gold House',
        description: 'A small and flashy condo.',
        price: 150.25,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
