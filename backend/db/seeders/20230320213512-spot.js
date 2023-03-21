'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    // try {
    //   await queryInterface.bulkInsert(options, [
    //     {
    //       ownerId: 1,
    //       address: '123 Main Street',
    //       city: 'New York City',
    //       state: 'New York',
    //       country: 'USA',
    //       lat: 40.7128,
    //       lng: -74.0060,
    //       name: 'Cozy Apartment',
    //       description: 'A small and comfortable apartment in the heart of the city.',
    //       price: 100.52,
    //     },
    //     {
    //       ownerId: 2,
    //       address: '456 Elm Street',
    //       city: 'San Francisco',
    //       state: 'California',
    //       country: 'USA',
    //       lat: 37.7749,
    //       lng: -122.4194,
    //       name: 'Luxury Penthouse',
    //       description: 'A spacious and luxurious penthouse with stunning city views.',
    //       price: 500.32,
    //     },
    //     {
    //       ownerId: 3,
    //       address: '789 Oak Street',
    //       city: 'London',
    //       state: '',
    //       country: 'UK',
    //       lat: 51.5074,
    //       lng: -0.1278,
    //       name: 'Charming Townhouse',
    //       description: 'A beautiful and charming townhouse located in a quiet neighborhood.',
    //       price: 200.12,
    //     },
    //     {
    //       ownerId: 4,
    //       address: '321 Pine Street',
    //       city: 'Miami',
    //       state: 'Florida',
    //       country: 'USA',
    //       lat: 25.7617,
    //       lng: -80.1918,
    //       name: 'Beachfront Condo',
    //       description: 'A modern and stylish condo with stunning ocean views.',
    //       price: 300.50,
    //     },
    //     {
    //       ownerId: 5,
    //       address: '123 Gold Street',
    //       city: 'Monterey Park',
    //       state: 'California',
    //       country: 'USA',
    //       lat: 50.1234,
    //       lng: -60.1234,
    //       name: 'Gold House',
    //       description: 'A small and flashy condo.',
    //       price: 150.25,
    //     },
    //   ]
    //   );
    //   console.log('Seeding successful');
    // } catch (error) {
    //   console.error('Seeding failed:', error);
    // }
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Main Street',
        city: 'New York City',
        state: 'New York',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Cozy Apartment',
        description: 'A small and comfortable apartment in the heart of the city.',
        price: 100.52,
      },
      {
        ownerId: 2,
        address: '456 Elm Street',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Luxury Penthouse',
        description: 'A spacious and luxurious penthouse with stunning city views.',
        price: 500.32,
      },
      {
        ownerId: 3,
        address: '789 Oak Street',
        city: 'London',
        state: '',
        country: 'UK',
        lat: 51.5074,
        lng: -0.1278,
        name: 'Charming Townhouse',
        description: 'A beautiful and charming townhouse located in a quiet neighborhood.',
        price: 200.12,
      },
      {
        ownerId: 4,
        address: '321 Pine Street',
        city: 'Miami',
        state: 'Florida',
        country: 'USA',
        lat: 25.7617,
        lng: -80.1918,
        name: 'Beachfront Condo',
        description: 'A modern and stylish condo with stunning ocean views.',
        price: 300.50,
      },
      {
        ownerId: 5,
        address: '123 Gold Street',
        city: 'Monterey Park',
        state: 'California',
        country: 'USA',
        lat: 50.1234,
        lng: -60.1234,
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
      ownerId: { [Op.in]: ['1', '2', '3', '4', '5'] }
    }, {});
  }
};
