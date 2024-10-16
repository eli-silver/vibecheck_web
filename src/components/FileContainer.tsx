import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@nextui-org/react";
import { FileStreamService } from '../services/FileStreamService';
import { RootState } from '../redux/store';
import { setSaveLocation, setRecording } from '../features/fileSlice';

const FileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const saveLocation = useSelector((state: RootState) => state.file.saveLocation);
  const isRecording = useSelector((state: RootState) => state.file.isRecording);
  const fileStreamService = FileStreamService.getInstance();

  const handleSelectLocation = async () => {
    try {
      const directory = await window.showDirectoryPicker();
      dispatch(setSaveLocation(directory.name));
      fileStreamService.setOutputDirectory(directory);
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      await fileStreamService.stopRecording();
      dispatch(setRecording(false));
    } else {
      const timestamp = new Date().toISOString().replace(/[-:]/g, '-').slice(0, -5);
      const filename = `data_${timestamp}.csv`;
      await fileStreamService.startRecording(filename);
      dispatch(setRecording(true));
    }
  };

  return (
    <div className="file-container">
      <Button onClick={handleSelectLocation}>
        {saveLocation ? `Save Location: ${saveLocation}` : 'Select Save Location'}
      </Button>
      <Button
        onClick={handleToggleRecording}
        disabled={!saveLocation}
        color={isRecording ? "danger" : "primary"}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </Button>
    </div>
  );
};

export default FileContainer;