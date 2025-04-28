const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const Asset = require('../models/Asset');
const connectDB = require('../config/db');

const loadAssetsData = async () => {
  try {
    await connectDB();

    const dataPath = path.join(__dirname, '../../assets.json');
    const assetsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    const assets = assetsData.map(asset => ({
      assetDescription: asset.assetDescription || null,
      assetId: asset.assetId,
      assetInfo: asset.assetInfo || '',
      assetInfoType: asset.assetInfoType || '',
      assetMask: asset.assetMask || null,
      assetName: asset.assetName || null,
      assetOwnerName: asset.assetOwnerName || null,
      balanceAsOf: asset.balanceAsOf ? new Date(asset.balanceAsOf) : null,
      balanceCostBasis: asset.balanceCostBasis || 0,
      balanceCostFrom: asset.balanceCostFrom || '',
      balanceCurrent: asset.balanceCurrent || 0,
      balanceFrom: asset.balanceFrom || '',
      balancePrice: asset.balancePrice || null,
      balancePriceFrom: asset.balancePriceFrom || '',
      balanceQuantityCurrent: asset.balanceQuantityCurrent || null,
      beneficiaryComposition: asset.beneficiaryComposition || null,
      cognitoId: asset.cognitoId || '',
      creationDate: asset.creationDate ? new Date(asset.creationDate) : null,
      currencyCode: asset.currencyCode || null,
      deactivateBy: asset.deactivateBy || null,
      descriptionEstatePlan: asset.descriptionEstatePlan || '',
      hasInvestment: asset.hasInvestment || null,
      holdings: asset.holdings || null,
      includeInNetWorth: asset.includeInNetWorth || false,
      institutionId: asset.institutionId || 0,
      institutionName: asset.institutionName || null,
      integration: asset.integration || null,
      integrationAccountId: asset.integrationAccountId || null,
      isActive: asset.isActive || false,
      isAsset: asset.isAsset || false,
      isFavorite: asset.isFavorite || false,
      isLinkedVendor: asset.isLinkedVendor || null,
      lastUpdate: asset.lastUpdate ? new Date(asset.lastUpdate) : null,
      lastUpdateAttempt: asset.lastUpdateAttempt ? new Date(asset.lastUpdateAttempt) : null,
      logoName: asset.logoName || null,
      modificationDate: asset.modificationDate ? new Date(asset.modificationDate) : null,
      nextUpdate: asset.nextUpdate ? new Date(asset.nextUpdate) : null,
      nickname: asset.nickname || '',
      note: asset.note || null,
      noteDate: asset.noteDate ? new Date(asset.noteDate) : null,
      ownership: asset.ownership || null,
      primaryAssetCategory: asset.primaryAssetCategory || '',
      status: asset.status || null,
      statusCode: asset.statusCode || null,
      userInstitutionId: asset.userInstitutionId || '',
      vendorAccountType: asset.vendorAccountType || null,
      vendorContainer: asset.vendorContainer || null,
      vendorResponse: asset.vendorResponse || null,
      vendorResponseType: asset.vendorResponseType || '',
      wealthAssetType: asset.wealthAssetType || '',
      wid: asset.wid || ''
    }));

    await Asset.insertMany(assets);
    console.log('Assets data inserted successfully');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error during migration:', err.message);
    mongoose.connection.close();
  }
};

loadAssetsData();
