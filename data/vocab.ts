
import { Topic } from '../types';
import { TOPICS_BEGINNER } from './vocab_beginner';
import { TOPICS_INTERMEDIATE } from './vocab_intermediate';
import { TOPICS_ADVANCED } from './vocab_advanced';
import { TOPICS_EXPERT } from './vocab_expert';

// Combine all topics into a single export for the app to use
export const TOPICS: Topic[] = [
  ...TOPICS_BEGINNER,
  ...TOPICS_INTERMEDIATE,
  ...TOPICS_ADVANCED,
  ...TOPICS_EXPERT
];
