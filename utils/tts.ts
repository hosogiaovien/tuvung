
export const speakWord = (text: string) => {
  if (!('speechSynthesis' in window)) {
    return;
  }

  const synth = window.speechSynthesis;

  // Mobile fix: Cancel any currently playing audio immediately.
  // This prevents the queue from getting stuck on Android/iOS when tapping quickly.
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // CRITICAL FOR MOBILE: 
  // Set the language explicitly. This allows the OS to use its default engine 
  // even if the `getVoices()` list hasn't loaded yet (which is common on first click).
  utterance.lang = 'en-US';

  // Standardize settings for clear pronunciation
  utterance.rate = 0.9; 
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Attempt to find a high-quality voice synchronously.
  // We DO NOT wait for onvoiceschanged because waiting breaks the "user gesture" requirement
  // on mobile browsers, causing the audio to be blocked.
  const voices = synth.getVoices();
  
  if (voices.length > 0) {
    // Try to find a preferred female/native voice
    const preferredVoice = voices.find(v => 
      // Strict language check to ensure American English accent
      (v.lang === 'en-US' || v.lang === 'en_US') && 
      // Prioritize common high-quality voice names found on OSs
      (
        v.name.includes('Samantha') || // iOS / macOS
        v.name.includes('Google US English') || // Android / Chrome
        v.name.includes('Zira') || // Windows
        v.name.includes('Premium') ||
        v.name.toLowerCase().includes('female')
      )
    );

    // Fallback to any available English voice if the specific ones aren't found
    const anyEnglishVoice = voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else if (anyEnglishVoice) {
      utterance.voice = anyEnglishVoice;
    }
  }

  // Speak immediately. 
  synth.speak(utterance);
};
