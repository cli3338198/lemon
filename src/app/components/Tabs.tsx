import { TabOptions, tabOptions } from "../types/tabs";

type Props = {
  activeTab: TabOptions;
  handleTabChange: (tab: TabOptions) => void;
};

export default function Tabs({ activeTab, handleTabChange }: Props) {
  return (
    <div className="flex gap-2 p-2 border border-blue-600 rounded-md shadow-md">
      {tabOptions.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`text-lg font-medium rounded-md px-4 py-2 transition-colors ${
            activeTab === tab
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
