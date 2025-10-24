import React from 'react';
import VoiceToText from '../voice-to-text-component/src/VoiceToText';
import '../voice-to-text-component/src/VoiceToText.css';

function App() {
  return (
    <div className="App">
      <header style={{ 
        backgroundColor: '#282c34', 
        padding: '20px', 
        color: 'white',
        textAlign: 'center'
      }}>
        <h1>🎙️ Voice to Text Component Test</h1>
      </header>
      <main style={{ 
        padding: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <VoiceToText 
          onTextChange={(text) => console.log('Current text:', text)}
          lang="en-US"
          className="my-voice-component"
          showSaveButton={true}
          showClearButton={true}
          onTextSave={(text) => console.log('Saving text:', text)}
        />
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '5px',
          maxWidth: '600px'
        }}>
          <p><strong>Instructions:</strong></p>
          <ul style={{ textAlign: 'left' }}>
            <li>Click the microphone button to start recording</li>
            <li>You'll see wave animation during recording</li>
            <li>Speak clearly into your microphone</li>
            <li>Click the mic again to stop recording</li>
            <li>Transcribed text will appear above the mic</li>
          </ul>
          <p><strong>Note:</strong> Works best in Chrome or Edge browsers</p>
        </div>
      </main>
    </div>
  );
}

export default App;
