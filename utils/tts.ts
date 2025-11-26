
export const speakWord = (text: string) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Browser does not support text-to-speech');
    return;
  }

  const synth = window.speechSynthesis;

  // Cancel any current speaking
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Get available voices
  let voices = synth.getVoices();

  // Helper to select voice
  const selectVoice = () => {
    // Prioritize English voices
    const englishVoices = voices.filter(v => v.lang.includes('en'));

    // Try to find a "female" sounding voice based on common names or metadata
    // Note: 'Microsoft Zira', 'Google US English' (often female), 'Samantha' are common
    let femaleVoice = englishVoices.find(v => 
      v.name.includes('Female') || 
      v.name.includes('Zira') || 
      v.name.includes('Samantha') || 
      v.name.includes('Google US English') ||
      v.name.includes('Venus')
    );

    // Fallback to any English voice if specific female voice not found
    const selectedVoice = femaleVoice || englishVoices[0] || voices[0];

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Adjust settings for better clarity
    utterance.rate = 0.85; // Slightly slower for learning
    utterance.pitch = 1.1; // Slightly higher pitch often sounds more feminine/clear
    utterance.volume = 1;

    synth.speak(utterance);
  };

  // Chrome loads voices asynchronously
  if (voices.length === 0) {
    synth.onvoiceschanged = () => {
      voices = synth.getVoices();
      selectVoice();
    };
  } else {
    selectVoice();
  }
};
