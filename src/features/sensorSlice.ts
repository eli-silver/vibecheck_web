import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SensorState {
  isEnabled: boolean;
  accelerationRange: string;
  sampleRate: string;
}

export interface SensorStateMap {
  [key: number]: SensorState;
}

const initialState: SensorStateMap = {
  0: { isEnabled: false, accelerationRange: '', sampleRate: '' },
  1: { isEnabled: false, accelerationRange: '', sampleRate: '' },
  2: { isEnabled: false, accelerationRange: '', sampleRate: '' },
};

export const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    toggleSensor: (state, action: PayloadAction<number>) => {
      const accelNumber = action.payload;
      state[accelNumber].isEnabled = !state[accelNumber].isEnabled;
    },
    setAccelerationRange: (state, action: PayloadAction<{ accelNumber: number; range: string }>) => {
      const { accelNumber, range } = action.payload;
      state[accelNumber].accelerationRange = range;
    },
    setSampleRate: (state, action: PayloadAction<{ accelNumber: number; rate: string }>) => {
      const { accelNumber, rate } = action.payload;
      state[accelNumber].sampleRate = rate;
    },
  },
});

export const { toggleSensor, setAccelerationRange, setSampleRate } = sensorSlice.actions;

export default sensorSlice.reducer;