import { useState } from "react";
import TabView from "./components/TabView";
import StopWatch from "./components/StopWatch";
import Timer from "./components/Timer";

enum TabKey {
  StopWatch = "StopWatch",
  Timer = "Timer",
}

const tabs = [
  {
    name: TabKey.Timer.toUpperCase(),
    key: TabKey.Timer,
  },
  {
    name: TabKey.StopWatch.toUpperCase(),
    key: TabKey.StopWatch,
  },
];

function App() {
  const [activeTabKey, setActiveTabKey] = useState(TabKey.Timer);

  const renderTab = (tabKey: string) => {
    switch (tabKey) {
      case TabKey.Timer:
        return <Timer />;

      case TabKey.StopWatch:
        return <StopWatch />;

      default:
        return <p>Default</p>;
    }
  };

  const handleTabChange = (tabKey: string) => {
    setActiveTabKey(tabKey as TabKey);
  };

  return (
    <div className="max-w-lg m-6 border border-gray-400 rounded-lg">
      <TabView
        tabs={tabs}
        activeKey={activeTabKey}
        onTabChange={handleTabChange}
        renderTab={renderTab}
      />
    </div>
  );
}

export default App;
