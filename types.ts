export enum Difficulty {
  BEGINNER = 'Sơ cấp (A1-A2)',
  INTERMEDIATE = 'Trung cấp (B1-B2)',
  ADVANCED = 'Cao cấp (C1-C2)',
  EXPERT = 'Thần thánh (IELTS 8.0+)'
}

export interface VocabWord {
  id: string;
  word: string;
  definition: string; // Vietnamese meaning
  synonyms?: string[];
  example?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  icon: string; // Icon name for UI
  words: VocabWord[];
}

export interface Question {
  targetWord: VocabWord;
  options: string[]; // Array of definitions
  correctOptionIndex: number;
}

export enum GameState {
  MENU_DIFFICULTY,
  MENU_TOPIC,
  PLAYING,
  RESULT
}

export interface GameStats {
  score: number;
  totalQuestions: number;
  streak: number;
  maxStreak: number;
  correctAnswers: number;
}