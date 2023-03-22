'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2021-11-19',
        endDate: '2021-12-19',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2021-1-19',
        endDate: '2021-11-19',
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2021-10-19',
        endDate: '2021-11-19',
      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2021-9-19',
        endDate: '2021-10-19',
      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2021-6-19',
        endDate: '2021-8-19',
        // 20:40:30
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
