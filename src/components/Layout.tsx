// src/components/Layout.tsx
import React from 'react';
import '../styles/Layout.css';
import Logo from './Logo'
import SerialConnect from './SerialConnect';
import SystemStatus from './SystemStatus';
import SettingsAccordion from './SettingsAccordion';
import FileContainer from './FileContainer';
import ChartComponent from './ChartCompoonent';
import PlotControlsComponent from './PlotControlsComponent';
import { useAppSelector } from '../redux/hooks';

const Layout: React.FC = () => {
    const plotSettings = useAppSelector(state => state.plot);

  return (
    <div className = "layout">
        <div className = "logo-serial-plot-controls container">
            <div className = "logo-serial container">
                <Logo/>
                <SerialConnect/>

            </div>
            <div className="plot scrollable container" style={{ overflowY: 'auto', maxHeight: '60vh' }}>

            {[1, 2, 3].map(channel => (
            <ChartComponent
              key={channel}
              channel={channel}
              windowWidth={plotSettings.windowWidth}
              autoRange={plotSettings.autoRange}
              yMin={plotSettings.yMin}
              yMax={plotSettings.yMax}
              triggerChannel={plotSettings.triggerChannel}
              triggerAxis={plotSettings.triggerAxis}
              triggerLevel={plotSettings.triggerLevel}
              useTrigger={plotSettings.useTrigger}
            />
          ))}
            </div>
            <div className = 'plot-controls container'>
                <PlotControlsComponent/>
            </div>
        </div>
        <div className = "status-settings-files container">
            <div className = "status container">
                <SystemStatus/>
            </div>
            <div className = "settings scrollable container">
            <SettingsAccordion />
            </div>
            <div className = "file container">
            
                <FileContainer />

            </div>
        </div>
    </div>
  );
};

export default Layout;
