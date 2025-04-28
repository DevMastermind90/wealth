import React, { useState, useMemo } from "react";
import { Asset } from "../types/Asset";
import AssetRow from "./AssetRow";

interface SubcategoryRowProps {
  subcategory: string;
  assets: Asset[];
  onAssetClick: (asset: Asset) => void;
}

const SubcategoryRow: React.FC<SubcategoryRowProps> = React.memo(
  ({ subcategory, assets, onAssetClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggle = () => setIsExpanded((prev) => !prev);

    const total = useMemo(() => {
      return assets.reduce((sum, asset) => sum + asset.balance, 0);
    }, [assets]);

    return (
      <>
        <tr>
          <td className="pl-10 py-2 cursor-pointer" onClick={toggle}>
            <div className="flex items-center gap-2">
              <span>{isExpanded ? "▾" : "▸"}</span>
              <span>{subcategory}</span>
            </div>
          </td>
          <td className="py-2 text-right">${total.toLocaleString()}</td>
        </tr>
        {isExpanded &&
          assets.map((asset) => (
            <AssetRow
              key={asset.name}
              asset={asset}
              onAssetClick={onAssetClick}
            />
          ))}
      </>
    );
  }
);

export default SubcategoryRow;
