const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const {
  Quote,
  Category,
  QuoteCategory,
  sequelize,
} = require('../models/index.js');

const CSV_FILENAME = path.resolve(__dirname, '../data/quotes.csv');

const validateAndSplitCategories = (categoriesStr) => {
  const categories = categoriesStr.split(', ');
  const isValid = !categories.some(
    (category) => category
      .includes(' ')
      || /[A-Z]/.test(category)
      || category.length === 0,
  );
  return isValid ? categories : [];
};

const formattingAuthor = (author) => {
  const formattedAuthor = author.split(',')[0].trim().slice(0, 255);
  return formattedAuthor || null;
};

/* eslint-disable no-restricted-syntax */
const importCategories = async () => {
  const BATCH_SIZE = 30000;

  const stream = fs.createReadStream(CSV_FILENAME).pipe(csv());
  const categoriesToCreate = [];
  try {
    for await (const row of stream) {
      const categories = validateAndSplitCategories(row.category);
      if (categories.length === 0) continue;
      categories.forEach((catName) => {
        categoriesToCreate.push({ name: catName });
      });

      if (categoriesToCreate.length >= BATCH_SIZE) {
        await Category.bulkCreate(categoriesToCreate, { ignoreDuplicates: true });
        console.log(`Batch of ${categoriesToCreate.length} categories has been added.`);
        categoriesToCreate.length = 0;
      }
    }

    if (categoriesToCreate.length > 0) {
      await Category.bulkCreate(categoriesToCreate, { ignoreDuplicates: true });
      console.log(`Batch of ${categoriesToCreate.length} categories has been added.`);
    }

    stream.destroy();

    console.log('The categories have been uploaded successfully.');
  } catch (error) {
    console.error('Error importing categories', error);
    stream.destroy();
  }
};

const insertQuoteBatch = async (quoteBatch) => {
  const quoteCategoryPairs = [];

  try {
    const createdQuotes = await Quote.bulkCreate(quoteBatch, { returning: true });
    console.log(`Batch of ${quoteBatch.length} quotes has been added.`);

    createdQuotes.forEach((quote, idx) => {
      const { id: quoteId } = quote;
      const { categoryIds } = quoteBatch[idx];

      categoryIds.forEach(
        (catId) => quoteCategoryPairs.push({
          QuoteId: quoteId,
          CategoryId: catId,
        }),
      );
    });

    await QuoteCategory.bulkCreate(quoteCategoryPairs, { ignoreDuplicates: true });
    console.log(`Batch of ${quoteCategoryPairs.length} quote-category pairs has been added.`);
  } catch (error) {
    console.error('Error insert quote batch', error);
  }
};

const importQuotes = async () => {
  const BATCH_SIZE = 5000;

  const stream = fs.createReadStream(CSV_FILENAME).pipe(csv());
  const quotesToCreate = [];

  try {
    const categoryList = await Category.findAll();
    const categoryMap = new Map(
      categoryList.map((cat) => [cat.name, cat.id]),
    );

    for await (const row of stream) {
      const categories = validateAndSplitCategories(row.category);
      if (categories.length === 0) continue;

      const categoryIds = categories.reduce((acc, name) => {
        const id = categoryMap.get(name);
        if (id) acc.push(id);
        return acc;
      }, []);

      const formattedAuthor = formattingAuthor(row.author);
      if (!formattedAuthor) continue;

      quotesToCreate.push({
        text: row.quote,
        author: formattedAuthor,
        categoryIds,
      });

      if (quotesToCreate.length >= BATCH_SIZE) {
        await insertQuoteBatch(quotesToCreate);
        quotesToCreate.length = 0;
      }
    }

    if (quotesToCreate.length > 0) {
      await insertQuoteBatch(quotesToCreate);
    }

    stream.destroy();

    console.log('The quotes have been uploaded successfully.');
  } catch (error) {
    console.error('Error importing quotes', error);
    stream.destroy();
  }
};

const startImport = async () => {
  try {
    console.time('⏱️ Время импорта');
    await sequelize.sync({ force: true });
    await importCategories();
    await importQuotes();
    console.log('Import has been finished.');
  } catch (error) {
    console.error('Error importing data', error);
  } finally {
    await sequelize.close();
    console.log('The database connection has been closed.');
    console.timeEnd('⏱️ Время импорта');
  }
};

startImport();
