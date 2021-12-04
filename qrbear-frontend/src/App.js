
import './css/App.scss';
import {SidebarMenu} from './Sidebar';

//modules
import { ModuleItemManagement } from './ModuleItemManagement';

import React, {useState} from 'react';

function App() {
  const modes = {
    ITEM_QUICK_ACTIONS: 'item_quick_actions',
    ITEM_MANAGEMENT: 'item_management',
    BINS_MANAGEMENT: 'bins_management',
    AISLES_LOCATIONS: 'aisles_locations',
    COUNTS_REPORTS: 'counts_reports',
    APP_PREFERENCES: 'app_preferences'
  }
  
  const [APP_MODE, setAPP_MODE] = useState(modes.ITEM_MANAGEMENT);

  const switchMode = (_mode) => {
    setAPP_MODE(_mode);
  }

  const attach = (_mode) => {
    switch (_mode) {
      case modes.ITEM_QUICK_ACTIONS:
        return (
          <ModuleItemManagement />
        );
      break;
      case modes.ITEM_MANAGEMENT: 
        return (
          <ModuleItemManagement />
        );
      break;
      case modes.BINS_MANAGEMENT:
      case modes.AISLES_LOCATIONS:
      case modes.COUNTS_REPORTS:
      case modes.APP_PREFERENCES:
        return (
        <div className='main-ops'>
          <h1>Module not yet implemented</h1>
          <h2>APP_MODE: {APP_MODE}</h2>
        </div>
        );
      break;
    }
  }

  return (
    <div className="App">
      <SidebarMenu callback={switchMode} modes={modes}/>
      {attach(APP_MODE)}
    </div>
  );
}


export default App;
