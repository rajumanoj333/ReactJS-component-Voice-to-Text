// Example of how to use the VoiceToText component in your React app

import React from 'react';
import VoiceToText from './voice-to-text-component/src/VoiceToText';
import './voice-to-text-component/src/VoiceToText.css';

function ExampleApp() {
  const handleTextChange = (text: string) => {
    console.log('Current transcribed text:', text);
  };

  const handleTextSave = (text: string) => {
    console.log('Saving text:', text);
    // Custom save logic here
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Example Usage of VoiceToText Component</h1>
      <p>Click the microphone button and start speaking to see it in action!</p>
      
      <VoiceToText 
        onTextChange={handleTextChange}
        lang="en-US"
        className="my-custom-class"
        showSaveButton={true}
        showClearButton={true}
        onTextSave={handleTextSave}
      />
    </div>
  );
}

export default ExampleApp;