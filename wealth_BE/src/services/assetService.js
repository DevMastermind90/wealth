const Asset = require('../models/Asset');
const { processAssets } = require('./processAssetsService');

const fetchAndProcessAssets = async () => {
  const assets = await Asset.find();
  return processAssets(assets);
};

module.exports = {
  fetchAndProcessAssets,
};
