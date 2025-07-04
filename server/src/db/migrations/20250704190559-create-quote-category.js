module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'QuoteCategory',
      {
        quoteId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Quote',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'Category',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
    );

    await queryInterface.addIndex('QuoteCategory', ['quoteId']);
    await queryInterface.addIndex('QuoteCategory', ['categoryId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('QuoteCategory');
  },
};
