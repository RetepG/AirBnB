'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down(queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: '1',
        userId: '1',
        startDate: '1-1-2000',
        endDate: '12-12-2025',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: '1',
        userId: '2',
        startDate: '1-1-2000',
        endDate: '12-12-2025',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: '2',
        userId: '3',
        startDate: '1-1-2000',
        endDate: '12-12-2025',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: '3',
        userId: '4',
        startDate: '1-1-2000',
        endDate: '12-12-2025',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      {
        spotId: '1',
        userId: '5',
        startDate: '1-1-2000',
        endDate: '12-12-2025',
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
