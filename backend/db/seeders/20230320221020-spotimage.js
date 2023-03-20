'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: www.image.com,
        preview: true,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: 2,
        url: www.image.com,
        preview: true,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: 3,
        url: www.image.com,
        preview: true,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: 4,
        url: www.image.com,
        preview: false,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: 5,
        url: www.image.com,
        preview: true,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
