import React from 'react';
import { Accordion, AccordionItem } from "@nextui-org/react";
import SensorSettings from './SensorSettingsComponent';
import SerialInput from './SerialInput';

const SettingsAccordion: React.FC = () => {
  return (
    <div className="max-h-full overflow-auto w-full p-4 padding-10">
      <Accordion 
        selectionMode="multiple"
        >
        <AccordionItem key="sensor0" aria-label="Sensor 0" 
        title={ <h3 className='text-white'>Sensor 0</h3>} 
        >
          <SensorSettings accelNumber={0} />
        </AccordionItem>
        <AccordionItem key="sensor1" aria-label="Sensor 1" 
          title={<h3 className='text-white'>Sensor 1</h3>}>
          <SensorSettings accelNumber={1} />
        </AccordionItem>
        <AccordionItem key="sensor2" aria-label="Sensor 2" 
          title={<h3 className='text-white'>Sensor 2</h3>}>
          <SensorSettings accelNumber={2} />
        </AccordionItem>
        <AccordionItem key="wavegen" aria-label="Wavegen" title={<h3 className='text-white'>Wavegen</h3>}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Wavegen</h3>
          </div>
        </AccordionItem>
        <AccordionItem key="lighting" aria-label="Lighting" title={<h3 className='text-white'>Lights</h3>}>
          <div>
            <h3 className="text-lg font-semibold mb-2">Lights</h3>
          </div>
        </AccordionItem>
        <AccordionItem key="serial" aria-label="Serial" title={<h3 className='text-white'>Serial</h3>}>
          <SerialInput />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SettingsAccordion;