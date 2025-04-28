import React from "react";
import { Asset } from "../types/Asset";

interface AssetRowProps {
  asset: Asset;
  onAssetClick: (asset: Asset) => void;
}

const AssetRow: React.FC<AssetRowProps> = React.memo(
  ({ asset, onAssetClick }) => {
    return (
      <tr
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => onAssetClick(asset)}
      >
        <td className="pl-16 py-1">{asset.name}</td>
        <td className="py-1 text-right">${asset.balance.toLocaleString()}</td>
      </tr>
    );
  }
);

export default AssetRow;
