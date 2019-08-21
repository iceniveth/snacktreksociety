import React, { useContext } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { LuckyLoserContext } from '../../../contexts/LuckyLoserContext';

export default function CenteredTabs(props) {
  const { curTab, setCurTab } = useContext(LuckyLoserContext);
  return (
    <Tabs
      value={curTab}
      onChange={(e, v) => setCurTab(v)}
      indicatorColor="primary"
      textColor="primary"
      centered
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
      }}
    >
      <Tab key="players" label="Players" />
      <Tab key="history" label="History" />
      <Tab key="settings" label="Settings" />
    </Tabs>
  );
}
