module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Quote',
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,

        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        text: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        author: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quote');
  },
};
