const processAssets = (assets) => {
  const categoryMap = {};

  assets.forEach(asset => {
    let category = '';
    let subcategory = '';
    const name = asset.nickname || 'Unnamed Asset';
    const balance = Math.round(asset.balanceCurrent || 0);

    const assetInfo = asset.assetInfo ? JSON.parse(asset.assetInfo) : {};

    if (asset.primaryAssetCategory === 'Cash') {
      category = 'Cash';
      subcategory = 'Cash';
    } else if (asset.primaryAssetCategory === 'Investment') {
      category = 'Investment';
      subcategory = assetInfo.cryptocurrencyName || assetInfo.slug === 'bitcoin'
        ? 'Cryptocurrency'
        : 'Brokerage';
    } else if (asset.primaryAssetCategory === 'RealEstate') {
      category = 'Real Estate';
      subcategory = 'Real Estate';
    } else {
      category = 'Other Property';
      subcategory = 'Vehicle';
    }

    if (!categoryMap[category]) categoryMap[category] = {};
    if (!categoryMap[category][subcategory]) categoryMap[category][subcategory] = [];

    categoryMap[category][subcategory].push({ name, balance });
  });

  return Object.entries(categoryMap).map(([category, subcategories]) => ({
    category,
    subcategories: Object.entries(subcategories).map(([subcategory, assets]) => ({
      subcategory,
      assets
    }))
  }));
};

module.exports = {
  processAssets,
};
