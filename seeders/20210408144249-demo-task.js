'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Tasks', [{
      description: 'Comprar abacaxi',
      done: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      description: 'Comer sushi',
      done: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      description: 'Brincar com Margarita',
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
