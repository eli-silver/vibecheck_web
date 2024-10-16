import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlotSettings {
  windowWidth: number;
  autoRange: boolean;
  yMin: number;
  yMax: number;
  triggerChannel: number;
  triggerAxis: 'x' | 'y' | 'z';
  triggerLevel: number;
  useTrigger: boolean;
}

const initialState: PlotSettings = {
  windowWidth: 100,
  autoRange: true,
  yMin: -10,
  yMax: 10,
  triggerChannel: 1,
  triggerAxis: 'z',
  triggerLevel: 1.5,
  useTrigger: false,
};

const plotSlice = createSlice({
  name: 'plot',
  initialState,
  reducers: {
    updatePlotSettings: (state, action: PayloadAction<Partial<PlotSettings>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePlotSettings } = plotSlice.actions;
export default plotSlice.reducer;