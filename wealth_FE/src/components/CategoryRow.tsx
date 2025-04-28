import React, { useState, useMemo } from "react";
import { Asset } from "../types/Asset";
import SubcategoryRow from "./SubcategoryRow";

interface CategoryRowProps {
  category: string;
  subcategories: {
    subcategory: string;
    assets: Asset[];
  }[];
  onAssetClick: (asset: Asset) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = React.memo(
  ({ category, subcategories, onAssetClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggle = () => setIsExpanded((prev) => !prev);

    const categoryTotal = useMemo(() => {
      return subcategories
        .flatMap((sub) => sub.assets)
        .reduce((sum, asset) => sum + asset.balance, 0);
    }, [subcategories]);

    return (
      <>
        <tr className="border-t bg-gray-50">
          <td className="p-3 cursor-pointer" onClick={toggle}>
            <div className="flex items-center gap-2 font-semibold">
              <span>{isExpanded ? "▾" : "▸"}</span>
              <span>{category}</span>
            </div>
          </td>
          <td className="p-3 text-right font-semibold">
            ${categoryTotal.toLocaleString()}
          </td>
        </tr>
        {isExpanded &&
          subcategories.map((subcategoryItem) => (
            <SubcategoryRow
              key={subcategoryItem.subcategory}
              subcategory={subcategoryItem.subcategory}
              assets={subcategoryItem.assets}
              onAssetClick={onAssetClick}
            />
          ))}
      </>
    );
  }
);

export default CategoryRow;
