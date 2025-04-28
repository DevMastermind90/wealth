const assetService = require('../services/assetService');

const getAllAssets = async (req, res) => {
  try {
    const assets = await assetService.fetchAndProcessAssets();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAssets,
};
