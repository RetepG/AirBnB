'use strict';

const { User, Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
        // ownerId: userId[2].id,
        ownerId: 1,
        address: '324 Demo Ave',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 40.5074,
        lng: 20.1278,
        name: 'Demolition House',
        description: 'A haunted house.',
        price: 300.50,
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
        // ownerId: userId[2].id,
        ownerId: 3,
        address: '702 Tree Street',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 58.5034,
        lng: 45.1278,
        name: 'Treetopia',
        description: 'A Treehouse located in the hills.',
        price: 150.17,
      },
      {
        // ownerId: userId[2].id,
        ownerId: 3,
        address: '911 Gold Park',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 55.5074,
        lng: 3.1278,
        name: 'Golden house',
        description: 'A house inspired by gold.',
        price: 900,
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
        // ownerId: userId[4].id,
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
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
