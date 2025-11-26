export const speakWord = (text: string) => {
  if (!('speechSynthesis' in window)) {
    return;
  }

  const synth = window.speechSynthesis;

  // QUAN TRỌNG VỚI MOBILE:
  // Mobile browser rất dễ bị kẹt hàng đợi (queue) nếu nhấn liên tục.
  // Phải hủy lệnh đọc trước đó ngay lập tức.
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);

  // QUAN TRỌNG VỚI MOBILE:
  // Trên điện thoại, getVoices() thường trả về rỗng lúc đầu hoặc load chậm.
  // Nếu chờ load xong mới đọc thì browser sẽ chặn vì mất "user interaction context".
  // Giải pháp: Set cứng lang='en-US'. Hệ điều hành sẽ tự dùng giọng mặc định (thường là rất tốt trên iOS/Android)
  // ngay cả khi chưa load được danh sách voice object.
  utterance.lang = 'en-US';

  // Tinh chỉnh tốc độ đọc cho dễ nghe
  utterance.rate = 0.9; 
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Cố gắng tìm giọng nữ/bản địa nếu danh sách giọng đã có sẵn (cached)
  // Không chờ đợi (async) để tránh bị chặn trên mobile.
  const voices = synth.getVoices();
  
  if (voices.length > 0) {
    const englishVoices = voices.filter(v => v.lang.includes('en'));
    
    // Ưu tiên tìm các giọng nữ chất lượng cao phổ biến trên mobile/desktop
    const preferredVoice = englishVoices.find(v => 
      // iOS
      v.name.includes('Samantha') || 
      // Android Chrome
      v.name.includes('Google US English') || 
      // Windows / General
      v.name.includes('Zira') || 
      v.name.includes('Female') ||
      v.name.includes('Premium')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    } else if (englishVoices.length > 0) {
        // Fallback lấy giọng Anh đầu tiên tìm thấy
        utterance.voice = englishVoices[0];
    }
  }

  // Thực thi ngay lập tức
  synth.speak(utterance);
};
