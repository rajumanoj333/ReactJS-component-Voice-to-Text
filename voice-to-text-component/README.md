# VoiceToText React Component

A simple, reusable React component for voice-to-text conversion with a clean UI featuring a microphone button and wave animation during recording.

## Features

- Simple microphone button UI
- Wave animation during recording
- Text display after recording stops
- Save and clear functionality
- Fully typed with TypeScript
- Customizable through props
- No external dependencies (uses Web Speech API)

## Installation

1. Copy the `VoiceToText.tsx` and `VoiceToText.css` files to your project
2. Import the component and CSS in your React component:

```jsx
import VoiceToText from './path/to/VoiceToText';
import './path/to/VoiceToText.css'; // Important: Don't forget to import the CSS
```

## Usage

```jsx
import React from 'react';
import VoiceToText from './VoiceToText';
import './VoiceToText.css'; // Don't forget to import the CSS

function App() {
  return (
    <div className="App">
      <h1>Voice to Text Component</h1>
      <VoiceToText 
        onTextChange={(text) => console.log('Current text:', text)}
        lang="en-US"
        className="my-custom-class"
        showSaveButton={true}
        showClearButton={true}
        onTextSave={(text) => console.log('Saving text:', text)}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onTextChange` | `(text: string) => void` | `undefined` | Callback fired when the transcribed text changes |
| `lang` | `string` | `'en-US'` | Language for speech recognition |
| `className` | `string` | `''` | Additional CSS class for the container |
| `placeholder` | `string` | `'Click the mic and start speaking...'` | Placeholder text when no text is present |
| `showSaveButton` | `boolean` | `true` | Whether to show the save button |
| `showClearButton` | `boolean` | `true` | Whether to show the clear button |
| `onTextSave` | `(text: string) => void` | `undefined` | Custom save handler, if not provided uses default save behavior |

## Browser Support

The component uses the Web Speech API which is supported in:
- Google Chrome (recommended)
- Microsoft Edge
- Other Chromium-based browsers

Note: The Web Speech API is not supported in Firefox, Safari, or older browsers.

## How It Works

1. Click the microphone button to start recording
2. Speak into your microphone
3. During recording, you'll see the wave animation indicating audio activity
4. Stop speaking and click the button again to stop recording
5. The transcribed text will appear in the text area
6. Use the save button to download the text or clear to reset

## Customization

You can customize the appearance by:
- Adding your own CSS classes via the `className` prop
- Overriding the default styles with custom CSS
- Providing custom callbacks for text changes and saving

## License

MIT