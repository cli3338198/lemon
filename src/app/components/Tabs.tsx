import { TabOptions, tabOptions } from "../types/tabs";

type Props = {
  activeTab: TabOptions;
  handleTabChange: (tab: TabOptions) => void;
};

export default function Tabs({ activeTab, handleTabChange }: Props) {
  return (
    <div className="flex bg-black p-2 border border-green-500">
      {tabOptions.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`p-3 text-lg font-mono border border-green-500 transition-colors ${
            activeTab === tab
              ? "bg-green-500 text-black"
              : "bg-gray-800 text-green-500 hover:bg-green-500 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
