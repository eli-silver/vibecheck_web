// src/redux/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import serialReducer, {SerialState} from '../features/serialSlice';
import systemStatusReducer, {SystemStatusState} from '../features/systemStatusSlice'
import { serialOutputReducer, SerialOutputState } from '../features/serialOutputSlice';
import sensorReducer, {SensorStateMap} from '../features/sensorSlice';
import fileReducer, {FileState} from '../features/fileSlice'



const rootReducer = combineReducers({
  serial: serialReducer,
  systemStatus: systemStatusReducer,
  serialOutput: serialOutputReducer,
  sensor: sensorReducer,
  file: fileReducer,
  // ... other reducers
});

export interface RootState {
  serial: SerialState;
  systemStatus: SystemStatusState;
  serialOutput: SerialOutputState;
  sensor: SensorStateMap;
  file: FileState;
}

export default rootReducer;