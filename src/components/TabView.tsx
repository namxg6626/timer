import clsx from "clsx";

interface TabViewProps {
  unmountOnChange?: boolean;
  tabs: Array<{
    key: string;
    name: string;
  }>;
  activeKey: string;
  renderTab: (tabKey: string) => JSX.Element;
  onTabChange: (tabKey: string) => void;
}

export default function TabView({
  unmountOnChange,
  tabs,
  activeKey,
  onTabChange,
  renderTab,
}: TabViewProps) {
  const innerRenderTab = (tabKey: string) => {
    return renderTab(tabKey);
  };

  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-400">
        <ul className="w-full flex flex-wrap -mb-px">
          {tabs.map((tab, i) => {
            return (
              <li
                onClick={() => onTabChange(tab.key)}
                key={tab.key}
                // className="flex-1 border-blue-600 border-b-2"
                className={clsx("flex-1 border-b-2", {
                  "border-blue-600 text-blue-600 active": tab.key === activeKey,
                  "border-gray-300 border-transparent": tab.key !== activeKey,
                })}
              >
                <span className={"p-4 inline-block cursor-pointer"}>
                  {tab.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        {!unmountOnChange &&
          tabs.map((tab, i) => {
            return (
              <div
                key={tab.key}
                className={clsx({
                  hidden: tab.key !== activeKey,
                })}
              >
                {innerRenderTab(tab.key)}
              </div>
            );
          })}
        {unmountOnChange && innerRenderTab(activeKey)}
      </div>
    </div>
  );
}
