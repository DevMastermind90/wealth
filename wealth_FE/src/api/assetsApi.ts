import { Asset } from "../types/Asset";

interface ApiResponseCategory {
  category: string;
  subcategories: {
    subcategory: string;
    assets: Asset[];
  }[];
}

const fetchAssets = async (): Promise<ApiResponseCategory[]> => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponseCategory[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
};

export { fetchAssets };
