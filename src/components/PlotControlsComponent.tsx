import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
// Import action creators for updating plot settings (you'll need to create these)
import { updatePlotSettings } from '../features/plotSlice';

const PlotControlsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [windowWidth, setWindowWidth] = useState(100);
  const [autoRange, setAutoRange] = useState(true);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [triggerChannel, setTriggerChannel] = useState(1);
  const [triggerAxis, setTriggerAxis] = useState<'x' | 'y' | 'z'>('z');
  const [triggerLevel, setTriggerLevel] = useState(1.5);
  const [useTrigger, setUseTrigger] = useState(false);

  const handleApplySettings = () => {
    dispatch(updatePlotSettings({
      windowWidth,
      autoRange,
      yMin,
      yMax,
      triggerChannel,
      triggerAxis,
      triggerLevel,
      useTrigger,
    }));
  };

  return (
    <div>
      <h2>Plot Controls</h2>
      <div>
        <label>
          Window Width:
          <input type="number" value={windowWidth} onChange={(e) => setWindowWidth(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
          Auto Range:
          <input type="checkbox" checked={autoRange} onChange={(e) => setAutoRange(e.target.checked)} />
        </label>
      </div>
      {!autoRange && (
        <>
          <div>
            <label>
              Y Min:
              <input type="number" value={yMin} onChange={(e) => setYMin(Number(e.target.value))} />
            </label>
          </div>
          <div>
            <label>
              Y Max:
              <input type="number" value={yMax} onChange={(e) => setYMax(Number(e.target.value))} />
            </label>
          </div>
        </>
      )}
      <div>
        <label>
          Use Trigger:
          <input type="checkbox" checked={useTrigger} onChange={(e) => setUseTrigger(e.target.checked)} />
        </label>
      </div>
      {useTrigger && (
        <>
          <div>
            <label>
              Trigger Channel:
              <input type="number" value={triggerChannel} onChange={(e) => setTriggerChannel(Number(e.target.value))} />
            </label>
          </div>
          <div>
            <label>
              Trigger Axis:
              <select value={triggerAxis} onChange={(e) => setTriggerAxis(e.target.value as 'x' | 'y' | 'z')}>
                <option value="x">X</option>
                <option value="y">Y</option>
                <option value="z">Z</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Trigger Level:
              <input type="number" value={triggerLevel} onChange={(e) => setTriggerLevel(Number(e.target.value))} />
            </label>
          </div>
        </>
      )}
      <button onClick={handleApplySettings}>Apply Settings</button>
    </div>
  );
};

export default PlotControlsComponent;