require('dotenv/config');
const config = require('./src/config/config');
const app = require('./src/app');

app.listen(config.port, () => {
  console.log(`Application is running on port ${config.port}`);
});
