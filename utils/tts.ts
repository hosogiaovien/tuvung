export const speakWord = (text: string) => {
  if (!('speechSynthesis' in window)) {
    return;
  }

  const synth = window.speechSynthesis;

  // FIX QUAN TRỌNG CHO ANDROID:
  // Trên Chrome Android, bộ đọc thường xuyên bị kẹt ở trạng thái "paused" hoặc "pending".
  // Gọi resume() trước tiên sẽ "đánh thức" nó dậy.
  if (synth.paused) {
    synth.resume();
  }

  // Hủy các lệnh cũ đang bị kẹt trong hàng đợi
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Thiết lập ngôn ngữ là bắt buộc để Mobile nhận diện đúng giọng Anh-Mỹ
  utterance.lang = 'en-US';
  
  // Tốc độ và âm lượng chuẩn
  utterance.rate = 0.9; 
  utterance.volume = 1.0;

  // Lấy danh sách giọng (có thể rỗng trên lần chạm đầu tiên ở mobile)
  const voices = synth.getVoices();
  
  if (voices.length > 0) {
    // Tìm giọng tiếng Anh Mỹ ưu tiên
    // Chúng ta tìm giọng có "Google US", "Samantha" (iOS), hoặc "Zira" (Windows)
    // Hoặc đơn giản là giọng en-US bất kỳ.
    const preferredVoice = voices.find(v => 
      (v.lang === 'en-US' || v.lang === 'en_US') && 
      !v.name.includes('Male') // Ưu tiên giọng nữ nếu tên không chứa "Male"
    );

    // Nếu tìm thấy giọng phù hợp thì set, còn không thì ĐỂ NGUYÊN (null).
    // Để nguyên (null) quan trọng vì OS sẽ tự dùng giọng mặc định tốt nhất của nó.
    // Cố ép gán giọng sai có thể làm mất tiếng.
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  }

  // Xử lý sự kiện lỗi để debug nếu cần (optional)
  utterance.onerror = (event) => {
    console.error('TTS Error:', event);
    // Nếu lỗi, thử ép resume lần nữa
    synth.resume();
  };

  // Phát âm thanh
  synth.speak(utterance);
};
