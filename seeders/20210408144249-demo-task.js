'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Tasks', [{
      description: 'Abacaxi',
      done: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      description: 'Sushi',
      done: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      description: 'Ketchup',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
