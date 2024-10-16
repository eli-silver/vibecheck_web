// src/components/Layout.tsx
import React from 'react';
import '../styles/Layout.css';
import Logo from './Logo'
import SerialConnect from './SerialConnect';
import SystemStatus from './SystemStatus';
import SettingsAccordion from './SettingsAccordion';
import FileContainer from './FileContainer';
import { FileStreamService } from '../services/FileStreamService';
import ChartComponent from './ChartCompoonent';
import PlotControlsComponent from './PlotControlsComponent';


const Layout: React.FC = () => {
    const fileStreamService = FileStreamService.getInstance();

  return (
    <div className = "layout">
        <div className = "logo-serial-plot-controls container">
            <div className = "logo-serial container">
                <Logo/>
                <SerialConnect/>

            </div>
            <div className = "plot scrollable container">
                <ChartComponent channel={1} windowWidth={100} autoRange={true} useTrigger={false} />
                <ChartComponent channel={2} windowWidth={100} autoRange={true} useTrigger={false} />
                <ChartComponent channel={3} windowWidth={100} autoRange={true} useTrigger={false} />
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
