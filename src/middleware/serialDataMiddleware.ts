import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from '@reduxjs/toolkit';
import { parseSerialData, Message, ChannelData, convertToCSV } from '../utils/dataParser';
import { setStatusMessage } from '../features/systemStatusSlice';
import { receiveData } from '../features/serialSlice';
import { FileStreamService } from '../services/FileStreamService';

type SerialDataReceivedAction = {
  type: 'SERIAL_DATA_RECEIVED';
  payload: string;
};

function isSerialDataReceivedAction(action: AnyAction): action is SerialDataReceivedAction {
  return action.type === 'SERIAL_DATA_RECEIVED' && typeof action.payload === 'string';
}

const createSerialDataMiddleware = (fileStreamService: FileStreamService): Middleware => 
  (store: MiddlewareAPI) => 
  (next: Dispatch) => 
  (action: AnyAction) => {
    if (action.type === 'SERIAL_DATA_RECEIVED') {
      const serialData: string = action.payload;
      const parsedMessage: Message = parseSerialData(serialData);

      switch (parsedMessage.type) {
        case 'data':
          if (Array.isArray(parsedMessage.data)) {
            const channelData = parsedMessage.data as ChannelData[];
            store.dispatch(receiveData(channelData));
            
            const fileStreamService = FileStreamService.getInstance();
            
            if (fileStreamService.getIsRecording()) {
              const csvData = convertToCSV(channelData);
              fileStreamService.writeToFile(csvData).catch(error => {
                console.error('Error writing to file:', error);
                store.dispatch(setStatusMessage(`Error writing to file: ${error.message}`));
              });
            }
          }
          break;
          break;
        case 'event':
          console.log('Event message:', parsedMessage.data);
          if (typeof parsedMessage.data === 'string') {
            store.dispatch( setStatusMessage(`Event: ${parsedMessage.data}`));
          }
          break;
        case 'ack':
          console.log('Acknowledgement:', parsedMessage.data);
          // Handle acknowledgements if needed
          break;
        case 'error':
          console.error('Error message:', parsedMessage.data);
          if (typeof parsedMessage.data === 'string') {
            store.dispatch(setStatusMessage(`Error: ${parsedMessage.data}`));
          }
          break;
      }
    }

    return next(action);
  };

export default createSerialDataMiddleware;