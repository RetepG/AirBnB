'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        // id: 1,
        spotId: 1,
        userId: 1,
        review: 'This house is nice.',
        stars: 5,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        // id: 1,
        spotId: 2,
        userId: 2,
        review: 'What a great looking home.',
        stars: 4,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        // id: 1,
        spotId: 3,
        userId: 3,
        review: 'This home was no as advertise 0/10 would never come back.',
        stars: 1,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        // id: 1,
        spotId: 4,
        userId: 4,
        review: 'Great accommodations for large groups.',
        stars: 5,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        // id: 1,
        spotId: 5,
        userId: 5,
        review: 'Great house 10/10.',
        stars: 5,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
