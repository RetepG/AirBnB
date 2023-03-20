'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        reviewId: 1,
        url: www.review.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        reviewId: 2,
        url: www.review.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        reviewId: 3,
        url: www.review.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        reviewId: 4,
        url: www.review.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        reviewId: 5,
        url: www.review.com,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
