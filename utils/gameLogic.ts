import { Question, Topic } from '../types';

export const generateQuiz = (topic: Topic, questionCount: number = 10): Question[] => {
  // 1. Get words from the selected topic
  const pool = topic.words;
  
  // If pool is smaller than requested count, adjust count
  const actualCount = Math.min(pool.length, questionCount);
  
  // 2. Shuffle and select target words
  const shuffledTargets = [...pool].sort(() => 0.5 - Math.random()).slice(0, actualCount);
  
  // 3. Generate options for each target
  return shuffledTargets.map(target => {
    // Filter out the target itself from potential distractors
    // We use the SAME topic for distractors to keep context relevant and difficult
    const otherWords = pool.filter(w => w.id !== target.id);
    
    // If not enough words in topic for distractors, we can't generate a valid question easily
    // (In a real app, we might pull from other topics of same difficulty)
    // For now, assume topic has at least 4 words.
    
    // Select 3 random distractors
    const distractors = [...otherWords]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.definition);
    
    // Combine target definition with distractors
    const allOptions = [target.definition, ...distractors];
    
    // Shuffle options
    const shuffledOptions = allOptions.sort(() => 0.5 - Math.random());
    
    return {
      targetWord: target,
      options: shuffledOptions,
      correctOptionIndex: shuffledOptions.indexOf(target.definition)
    };
  });
};

export const getCompliment = (streak: number): string => {
  if (streak === 0) return "Cố lên nào!";
  if (streak < 3) return "Làm tốt lắm!";
  if (streak < 5) return "Tuyệt vời!";
  if (streak < 10) return "Xuất sắc!";
  if (streak < 15) return "Không thể cản phá!";
  return "THẦN THÁNH!";
};
