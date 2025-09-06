
import React, { useState, useEffect, useCallback } from 'react';

// Interfaces for Web Speech API (subset for this hook)
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

// Use ISpeechRecognitionEvent instead of the global SpeechRecognitionEvent
interface ISpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

// Use ISpeechRecognitionErrorEvent instead of the global SpeechRecognitionErrorEvent
interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string; // Corresponds to SpeechRecognitionErrorCode in full Web API
  readonly message: string;
}

// Use ISpeechRecognition instead of the global SpeechRecognition
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  grammars: any; // Replace 'any' with 'SpeechGrammarList' if specific grammar features are used
  maxAlternatives: number;

  onstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => any) | null;
  onerror: ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  // Other event handlers (onaudiostart, etc.) can be added if needed

  start: () => void;
  stop: () => void;
  abort: () => void;
}

// Interface for the constructor of SpeechRecognition
interface ISpeechRecognitionStatic {
  new(): ISpeechRecognition;
}


interface SpeechRecognitionHook {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  startListening: () => void;
  stopListening: () => void;
  isSupported: boolean;
  resetTranscript: () => void;
}

const useSpeechRecognition = (): SpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [recognitionInstance, setRecognitionInstance] = useState<ISpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition as ISpeechRecognitionStatic | undefined;
    
    if (SpeechRecognitionAPI) {
      setIsSupported(true);
      const recognition: ISpeechRecognition = new SpeechRecognitionAPI();
      recognition.continuous = false; // Process single utterances
      recognition.interimResults = true; // Get results as the user speaks
      recognition.lang = 'ar-SA'; // Set to Arabic

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setTranscript('');
        setInterimTranscript('');
      };

      recognition.onresult = (event: ISpeechRecognitionEvent) => {
        let interim = '';
        let final = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setInterimTranscript(interim + final); // Show the most up-to-date transcript visually
        if (final) {
            setTranscript(final); // Final transcript for processing
        }
      };

      recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
        setError(event.error); // event.error is a string as per ISpeechRecognitionErrorEvent
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      setRecognitionInstance(recognition);
    } else {
      setIsSupported(false);
      setError("Speech recognition is not supported in this browser.");
    }

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const startListening = useCallback(() => {
    if (recognitionInstance && !isListening) {
      setTranscript(''); // Clear previous transcript
      setInterimTranscript('');
      try {
        recognitionInstance.start();
      } catch (e) {
        // Handle cases where start() is called prematurely or recognition is already active
        console.error("Error starting speech recognition:", e);
        setError("Could not start listening. Please try again.");
        setIsListening(false);
      }
    }
  }, [recognitionInstance, isListening]);

  const stopListening = useCallback(() => {
    if (recognitionInstance && isListening) {
      recognitionInstance.stop();
      setIsListening(false);
    }
  }, [recognitionInstance, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return { isListening, transcript, interimTranscript, error, startListening, stopListening, isSupported, resetTranscript };
};

export default useSpeechRecognition;
