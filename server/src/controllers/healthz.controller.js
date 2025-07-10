const db = require('../../db/models');

const isDatabaseAvailable = async () => {
  try {
    await db.sequelize.authenticate();
    return true;
  } catch {
    return false;
  }
};

const checkHealthz = async (req, res) => {
  const dbAvailable = await isDatabaseAvailable();
  const dbStatus = dbAvailable ? 'connected' : 'unreachable';
  const statusCode = dbAvailable ? 200 : 503;

  return res
    .status(statusCode)
    .json({
      api: 'available',
      database: dbStatus,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
};

module.exports = {
  checkHealthz,
};
