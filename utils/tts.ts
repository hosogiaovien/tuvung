// Giữ tham chiếu toàn cục để ngăn Garbage Collector
let activeUtterance: SpeechSynthesisUtterance | null = null;

export const speakWord = (text: string) => {
  // Kiểm tra hỗ trợ trình duyệt an toàn
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  const synth = window.speechSynthesis;

  // 1. Cố gắng đánh thức bộ đọc (Fix cho Android bị ngủ đông)
  try {
    if (synth.paused) {
      synth.resume();
    }
  } catch (e) {
    console.error("Resume error:", e);
  }

  // 2. Hủy lệnh cũ ngay lập tức để tránh hàng đợi bị kẹt
  try {
    synth.cancel();
  } catch (e) {
    console.error("Cancel error:", e);
  }

  // 3. Tạo đối tượng đọc mới
  const utterance = new SpeechSynthesisUtterance(text);

  // 4. Cấu hình CƠ BẢN NHẤT (Quan trọng cho Android cũ)
  // Android cũ thường lỗi nếu set voice object phức tạp.
  // Chỉ set lang chuẩn, để OS tự chọn giọng mặc định tốt nhất của máy đó.
  utterance.lang = 'en-US';
  utterance.rate = 0.9; 
  utterance.volume = 1.0;
  utterance.pitch = 1.0;

  // 5. Logic chọn giọng (Chỉ áp dụng nếu trình duyệt hỗ trợ tốt)
  // Nếu là Android cũ, đôi khi getVoices() trả về rỗng hoặc object không chuẩn gây crash.
  // Ta chỉ set voice nếu tìm thấy chính xác, nếu không thì tin tưởng hoàn toàn vào 'lang'.
  const voices = synth.getVoices();
  if (voices.length > 0) {
    // Ưu tiên giọng nữ chuẩn (Samantha/Google US/Zira)
    const preferredVoice = voices.find(v => 
      (v.lang === 'en-US' || v.lang === 'en_US') && 
      (!v.name.includes('Male') || v.name.includes('Samantha') || v.name.includes('Google US English'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  }

  // 6. Gắn vào window (NUCLEAR FIX cho Garbage Collection trên Android cũ)
  // Android cũ rất hung hăng trong việc xóa bộ nhớ, ta phải gắn nó trực tiếp vào window object.
  activeUtterance = utterance;
  (window as any)._tts_utterance_hack = utterance;

  // Dọn dẹp sau khi đọc xong
  utterance.onend = () => {
    activeUtterance = null;
    delete (window as any)._tts_utterance_hack;
  };

  utterance.onerror = (event) => {
    console.error("TTS Error:", event);
    activeUtterance = null;
    delete (window as any)._tts_utterance_hack;
    // Thử cứu vãn tình thế bằng cách resume
    if (synth.paused) synth.resume();
  };

  // 7. Phát âm thanh
  try {
    synth.speak(utterance);
    
    // Fix thêm cho một số dòng Samsung/Oppo cũ: gọi resume ngay sau speak để "đẩy" âm thanh ra
    if (synth.paused) synth.resume();
  } catch (e) {
    console.error("Speak error:", e);
  }
};
