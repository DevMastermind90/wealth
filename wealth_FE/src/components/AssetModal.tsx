import React from "react";
import { Asset } from "../types/Asset";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  asset: Asset | null;
  onClose: () => void;
}

const AssetModal: React.FC<ModalProps> = ({ asset, onClose }) => {
  if (!asset) {
    return null;
  }

  console.log(asset);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-96 p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{asset.name}</h3>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <IoMdClose className="h-6 w-6 fill-current" />
          </button>
        </div>
        <div>
          <span className="text-gray-700 font-semibold">Balance</span>
          <p className="text-gray-800">
            ${asset.balance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetModal;
