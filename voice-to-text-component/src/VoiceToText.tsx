import React, { useState, useRef, useEffect } from 'react';

// Define the props interface
interface VoiceToTextProps {
  onTextChange?: (text: string) => void;
  lang?: string;
  className?: string;
  placeholder?: string;
  showSaveButton?: boolean;
  showClearButton?: boolean;
  onTextSave?: (text: string) => void;
}

// Type definition for SpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const VoiceToText: React.FC<VoiceToTextProps> = ({
  onTextChange,
  lang = 'en-US',
  className = '',
  placeholder = 'Click the mic and start speaking...',
  showSaveButton = true,
  showClearButton = true,
  onTextSave
}) => {
  const [text, setText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Notify parent component when text changes
  useEffect(() => {
    if (onTextChange) {
      onTextChange(text);
    }
  }, [text, onTextChange]);

  const startListening = () => {
    const SpeechRecognition = 
      window.SpeechRecognition || 
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setText(prev => prev + transcript + ' ');
        } else {
          interimTranscript += transcript;
        }
      }
      
      // Update text with interim results for real-time display
      setText(prev => prev + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      setText('');
      startListening();
    }
  };

  const handleSave = () => {
    if (onTextSave) {
      onTextSave(text);
    } else {
      // Default save behavior
      if (!text.trim()) {
        alert('No text to save!');
        return;
      }
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'Voice_as_text.txt';
      a.click();
      URL.revokeObjectURL(a.href);
    }
  };

  const handleClear = () => {
    setText('');
    if (onTextChange) {
      onTextChange('');
    }
  };

  return (
    <div className={`voice-to-text-container ${className}`}>
      {/* Text display area */}
      {text ? (
        <div className="text-display">
          {text}
        </div>
      ) : (
        <div className="text-placeholder">
          {placeholder}
        </div>
      )}

      {/* Mic button with animation */}
      <div className="mic-button-container">
        <button
          onClick={handleToggle}
          className={`mic-button ${isListening ? 'listening' : ''}`}
          title={isListening ? 'Stop recording' : 'Start recording'}
          type="button"
        >
          {isListening ? (
            <div className="wave-animation">
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>
          ) : (
            <svg 
              className="mic-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M5.031 8.501A6.5 6.5 0 0 1 17.969 8.5c0 3.88-2.621 6.5-6.469 6.5v4.5h-2.5v-4.5c-3.848 0-6.469-2.62-6.469-6.5 0-1.418.42-2.74 1.125-3.875L3.5 6.75a8 8 0 0 0-.469 6.751v.002c0 4.97 3.5 8.247 7.469 8.247 3.969 0 7.469-3.277 7.469-8.247a8 8 0 0 0-.469-6.751l-1.625-2.25A6.45 6.45 0 0 1 11.5 2c-1.52 0-2.905.485-4.031 1.276L5.031 8.501zm10.5 2.25a2 2 0 0 1-4 0v-7a2 2 0 0 1 4 0v7z" />
            </svg>
          )}
        </button>
      </div>

      {/* Status text */}
      {isListening && (
        <div className="status-text">
          Listening... Speak now
        </div>
      )}

      {/* Action buttons */}
      {text && (
        <div className="action-buttons">
          {showSaveButton && (
            <button
              onClick={handleSave}
              className="button save-button"
              type="button"
            >
              💾 Save Text
            </button>
          )}
          {showClearButton && (
            <button
              onClick={handleClear}
              className="button clear-button"
              type="button"
            >
              🗑️ Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceToText;