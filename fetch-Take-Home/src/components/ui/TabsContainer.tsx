import { JSX, useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";

interface TabItem {
  label: string;
  content: JSX.Element;
}

interface TabsContainerProps {
  tabs: TabItem[];
}

export const TabsContainer = ({ tabs }: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={(_, newIndex) => setActiveTab(newIndex)}
        centered
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
      <Box mt={2}>{tabs[activeTab].content}</Box>
    </Box>
  );
};
