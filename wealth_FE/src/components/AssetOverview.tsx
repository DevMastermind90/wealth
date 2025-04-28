import { useState, useEffect } from "react";
import { Asset } from "../types/Asset";
import CategoryRow from "./CategoryRow";
import { fetchAssets } from "../api/assetsApi";
import BeatLoader from "react-spinners/BeatLoader";
import AssetModal from "./AssetModal";

interface ApiResponseCategory {
  category: string;
  subcategories: {
    subcategory: string;
    assets: Asset[];
  }[];
}

const AssetOverview = () => {
  const [categories, setCategories] = useState<ApiResponseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAssets();
      setCategories(data);
    } catch (e: unknown) {
      let errorMessage = "Failed to load assets.";
      if (e instanceof Error) {
        errorMessage = e.message;
      } else if (typeof e === "string") {
        errorMessage = e;
      }
      setError(errorMessage);
      console.error("Error fetching assets:", e);
    } finally {
      setLoading(false);
    }
  };

  const retryLoadAssets = () => {
    setCategories([]);
    setLoading(true);
    setError(null);
    loadAssets();
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  const handleCloseModal = () => {
    setSelectedAsset(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <BeatLoader color="#3b82f6" size={16} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col justify-center items-center h-48 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Oops! Something went wrong.</strong>
        <span className="block sm:inline">{error}</span>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={retryLoadAssets}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 font-semibold">
                Category / Subcategory / Asset
              </th>
              <th className="p-3 font-semibold text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categoryItem) => (
              <CategoryRow
                key={categoryItem.category}
                category={categoryItem.category}
                subcategories={categoryItem.subcategories}
                onAssetClick={handleAssetClick}
              />
            ))}
          </tbody>
        </table>
      </div>
      {selectedAsset && (
        <AssetModal asset={selectedAsset} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AssetOverview;
