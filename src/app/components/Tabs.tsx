import { TabOptions, tabOptions } from "../types/types";

type Props = {
  activeTab: TabOptions;
  handleTabChange: (tab: TabOptions) => void;
};

export default function Tabs({ activeTab, handleTabChange }: Props) {
  return (
    <div className="flex bg-gray-300 p-2">
      {tabOptions.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabChange(tab)}
          className={`p-2 ${activeTab === tab ? "bg-gray-400" : ""}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
