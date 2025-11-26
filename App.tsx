import React, { useState, useEffect } from 'react';
import { 
  Brain, Trophy, ChevronRight, RotateCcw, Volume2, Star, CheckCircle, XCircle, Zap, BookOpen, ArrowLeft, Grid, 
  Users, Clock, Utensils, Book, Briefcase, Cpu, Leaf, Globe, Atom, Plane, Home, GraduationCap, Palette, Gavel, 
  Microscope, Lightbulb, Music, HeartPulse, Building2,
  Cat, Shirt, CloudSun, Watch, Smile, Dumbbell, Tv, Trees, ShoppingBag, UserCheck, Scale, BrainCircuit, TrendingUp, Rocket, Quote, LibraryBig,
  Gamepad2, Bus, Sun, MapPin, Paintbrush, Hammer,
  // New Beginner Icons Extension
  MessageCircle, Mountain, Box, Smartphone, Medal, CreditCard, Activity, ArrowUpRight, Play, Wrench, Tag, Layers, Wifi, MousePointer, ShoppingCart, Gift,
  // New Beginner Expansion 2
  Hash, Coffee, Apple, Armchair, Bath, Pen, Car, Tractor, Umbrella, Scissors, Anchor, Ghost, Key,
  // New Beginner Expansion 3 (x10)
  CalendarDays, Move, Guitar, UtensilsCrossed, Glasses, School, SmilePlus, Store, Navigation, Cake,
  // New Beginner Expansion 4 (x10)
  Link, Shapes,
  // New Beginner Expansion 5 (Double x10)
  Trash2, Baby, Star as Star2, Snowflake, Moon, Cloud, CheckSquare, Heart, Sparkles, AlertTriangle,
  // New Intermediate Icons
  HeartHandshake, Building, Film, ChefHat, Tent, Stethoscope, CloudLightning, Siren, Coins, Laptop,
  // New Intermediate Expansion 3
  FlaskConical, CloudRain, User, Wallet, MessageSquare, Truck, PartyPopper, PawPrint,
  // New Intermediate Expansion 4 (Double x10)
  Megaphone, Compass, Landmark, Briefcase as Briefcase2, Users as Users3, Globe as Globe3, Newspaper as Newspaper2, Clapperboard, Award, Target,
  // New Intermediate Expansion 5 (x10)
  BedDouble, Banknote, Image, Joystick, Package, SprayCan, Hotel, Mail,
  // New Intermediate Expansion 6 (x10)
  Telescope, Mic,
  // New Advanced Icons
  Globe2, Landmark as Landmark2, Crown, Languages, Users2, PieChart, FileSearch, Factory, ShieldAlert, MonitorSmartphone,
  // New Advanced Expansion (x10)
  Newspaper, Wheat, BatteryCharging, FlaskRound, BookOpenCheck, Gem, Carrot, Network, CloudFog, Fish,
  // New Expert Icons
  Scroll, Binary, Theater, Sprout, Microscope as Microscope2, Fingerprint,
  // New Expert Expansion (x10)
  Flag, Syringe, Music2, Map, Flower, ShieldCheck, Frame, Dna, Compass as Compass2, Database,
  // New Expert Expansion 2 (x10)
  Skull, Copyright, Sigma, Vote, Feather, Waves, Lock, Camera, Bone, Calculator,
  // New Expert Expansion 3 (x10)
  Hourglass, Droplets, Bug, Container, Eye, Speaker, BrainCog, TestTube, Radar, Magnet
} from 'lucide-react';
import { Difficulty, GameState, Question, GameStats, Topic } from './types';
import { TOPICS } from './data/vocab';
import { generateQuiz, getCompliment } from './utils/gameLogic';
import { playSound } from './utils/sounds';
import { Button } from './components/Button';
import { ParticleConfetti } from './components/ParticleConfetti';

// Map icon strings to Lucide components
const iconMap: Record<string, React.FC<any>> = {
  'Users': Users,
  'Clock': Clock,
  'Utensils': Utensils,
  'BookOpen': BookOpen,
  'Briefcase': Briefcase,
  'Cpu': Cpu,
  'Leaf': Leaf,
  'Globe': Globe,
  'Brain': Brain,
  'Atom': Atom,
  'Plane': Plane,
  'Home': Home,
  'GraduationCap': GraduationCap,
  'Palette': Palette,
  'Gavel': Gavel,
  'Microscope': Microscope,
  'Lightbulb': Lightbulb,
  'Music': Music,
  'HeartPulse': HeartPulse,
  'Building2': Building2,
  'Cat': Cat,
  'Shirt': Shirt,
  'CloudSun': CloudSun,
  'Watch': Watch,
  'Smile': Smile,
  'Dumbbell': Dumbbell,
  'Tv': Tv,
  'Trees': Trees,
  'ShoppingBag': ShoppingBag,
  'UserCheck': UserCheck,
  'Scale': Scale,
  'BrainCircuit': BrainCircuit,
  'TrendingUp': TrendingUp,
  'Rocket': Rocket,
  'Quote': Quote,
  'LibraryBig': LibraryBig,
  'Trophy': Trophy, // Added Trophy here
  // New Beginner Icons
  'Gamepad2': Gamepad2,
  'Bus': Bus,
  'Sun': Sun,
  'MapPin': MapPin,
  'Paintbrush': Paintbrush,
  'Hammer': Hammer,
  // Beginner Extension
  'MessageCircle': MessageCircle,
  'Mountain': Mountain,
  'Box': Box,
  'Smartphone': Smartphone,
  'Medal': Medal,
  'CreditCard': CreditCard,
  'Activity': Activity,
  'ArrowUpRight': ArrowUpRight,
  'Play': Play,
  'Wrench': Wrench,
  'Tag': Tag,
  'Layers': Layers,
  'Wifi': Wifi,
  'MousePointer': MousePointer,
  'ShoppingCart': ShoppingCart,
  'Gift': Gift,
  // Beginner Expansion 2
  'Hash': Hash,
  'Coffee': Coffee,
  'Apple': Apple,
  'Armchair': Armchair,
  'Bath': Bath,
  'Pen': Pen,
  'Car': Car,
  'Tractor': Tractor,
  'Umbrella': Umbrella,
  'Scissors': Scissors,
  'Anchor': Anchor,
  'Ghost': Ghost,
  'Key': Key,
  // Beginner Expansion 3
  'CalendarDays': CalendarDays,
  'Move': Move,
  'Guitar': Guitar,
  'UtensilsCrossed': UtensilsCrossed,
  'Glasses': Glasses,
  'School': School,
  'SmilePlus': SmilePlus,
  'Store': Store,
  'Navigation': Navigation,
  'Cake': Cake,
  // Beginner Expansion 4
  'Link': Link,
  'Shapes': Shapes,
  // Beginner Expansion 5
  'Trash2': Trash2,
  'Baby': Baby,
  'Star': Star,
  'Snowflake': Snowflake,
  'Moon': Moon,
  'Cloud': Cloud,
  'CheckSquare': CheckSquare,
  'Heart': Heart,
  'Sparkles': Sparkles,
  'AlertTriangle': AlertTriangle,
  // New Intermediate Icons
  'HeartHandshake': HeartHandshake,
  'Building': Building,
  'Film': Film,
  'ChefHat': ChefHat,
  'Tent': Tent,
  'Stethoscope': Stethoscope,
  'CloudLightning': CloudLightning,
  'Siren': Siren,
  'Coins': Coins,
  'Laptop': Laptop,
  // Intermediate Expansion 3
  'FlaskConical': FlaskConical,
  'CloudRain': CloudRain,
  'User': User,
  'Wallet': Wallet,
  'MessageSquare': MessageSquare,
  'Truck': Truck,
  'PartyPopper': PartyPopper,
  'PawPrint': PawPrint,
  // Intermediate Expansion 4
  'Megaphone': Megaphone,
  'Compass': Compass,
  'Landmark': Landmark,
  'Briefcase2': Briefcase,
  'Users3': Users,
  'Globe3': Globe,
  'Newspaper2': Newspaper,
  'Clapperboard': Clapperboard,
  'Award': Award,
  'Target': Target,
  // Intermediate Expansion 5
  'BedDouble': BedDouble,
  'Banknote': Banknote,
  'Image': Image,
  'Joystick': Joystick,
  'Package': Package,
  'SprayCan': SprayCan,
  'Hotel': Hotel,
  'Mail': Mail,
  // Intermediate Expansion 6
  'Telescope': Telescope,
  'Mic': Mic,
  // New Advanced Icons
  'Globe2': Globe2,
  'Landmark2': Landmark,
  'Crown': Crown,
  'Languages': Languages,
  'Users2': Users2,
  'PieChart': PieChart,
  'FileSearch': FileSearch,
  'Factory': Factory,
  'ShieldAlert': ShieldAlert,
  'MonitorSmartphone': MonitorSmartphone,
  // New Advanced Expansion
  'Newspaper': Newspaper,
  'Wheat': Wheat,
  'BatteryCharging': BatteryCharging,
  'FlaskRound': FlaskRound,
  'BookOpenCheck': BookOpenCheck,
  'Gem': Gem,
  'Carrot': Carrot,
  'Network': Network,
  'CloudFog': CloudFog,
  'Fish': Fish,
  // New Expert Icons
  'Scroll': Scroll,
  'Binary': Binary,
  'Theater': Theater,
  'Sprout': Sprout,
  'Fingerprint': Fingerprint,
  // New Expert Expansion
  'Flag': Flag,
  'Syringe': Syringe,
  'Music2': Music2,
  'Map': Map,
  'Flower': Flower,
  'ShieldCheck': ShieldCheck,
  'Frame': Frame,
  'Dna': Dna,
  'Compass2': Compass,
  'Database': Database,
  // New Expert Expansion 2
  'Skull': Skull,
  'Copyright': Copyright,
  'Sigma': Sigma,
  'Vote': Vote,
  'Feather': Feather,
  'Waves': Waves,
  'Lock': Lock,
  'Camera': Camera,
  'Bone': Bone,
  'Calculator': Calculator,
  // New Expert Expansion 3
  'Hourglass': Hourglass,
  'Droplets': Droplets,
  'Bug': Bug,
  'Container': Container,
  'Eye': Eye,
  'Speaker': Speaker,
  'BrainCog': BrainCog,
  'TestTube': TestTube,
  'Radar': Radar,
  'Magnet': Magnet
};

function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU_DIFFICULTY);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.INTERMEDIATE);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    totalQuestions: 0,
    streak: 0,
    maxStreak: 0,
    correctAnswers: 0
  });
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // --- Actions ---

  const handleDifficultySelect = (level: Difficulty) => {
    setDifficulty(level);
    playSound('select');
    setGameState(GameState.MENU_TOPIC);
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    playSound('select');
    startTopicGame(topic);
  };

  const startTopicGame = (topic: Topic) => {
    // Increase max questions to 100 for a massive challenge
    const q = generateQuiz(topic, 100); 
    setQuestions(q);
    setCurrentQIndex(0);
    setStats({
      score: 0,
      totalQuestions: q.length,
      streak: 0,
      maxStreak: 0,
      correctAnswers: 0
    });
    setGameState(GameState.PLAYING);
    setIsAnswered(false);
    setSelectedOption(null);
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentQIndex];
    const isCorrect = index === currentQ.correctOptionIndex;

    if (isCorrect) {
      playSound('correct');
      if (stats.streak > 1) setShowConfetti(true);
      
      setStats(prev => ({
        ...prev,
        score: prev.score + (100 + (prev.streak * 10)),
        streak: prev.streak + 1,
        maxStreak: Math.max(prev.streak + 1, prev.maxStreak),
        correctAnswers: prev.correctAnswers + 1
      }));
    } else {
      playSound('incorrect');
      setStats(prev => ({
        ...prev,
        streak: 0
      }));
    }

    setTimeout(() => setShowConfetti(false), 1000);
  };

  const nextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    playSound('win');
    setGameState(GameState.RESULT);
  };

  const resetToTopics = () => {
    playSound('select');
    setGameState(GameState.MENU_TOPIC);
  };

  const replayTopic = () => {
    if (selectedTopic) {
      startTopicGame(selectedTopic);
    }
  };

  // --- Render Helpers ---

  const renderDifficultyMenu = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-pop max-w-2xl mx-auto">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse rounded-full"></div>
        <Brain className="w-24 h-24 text-cyan-400 relative z-10 animate-float" />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
        VocabMaster
      </h1>
      
      <div className="text-slate-300 text-lg md:text-xl mb-8 w-full text-center font-medium text-cyan-100/90 flex flex-col items-center gap-1">
        <span>Luyện từ vựng Tiếng Anh</span>
        <span>cùng thầy Toán - Quốc Hưng.</span>
      </div>

      <div className="w-full max-w-md space-y-3">
        <label className="text-slate-400 text-sm uppercase tracking-wider font-bold mb-2 block">
          Chọn cấp độ
        </label>
        {Object.values(Difficulty).map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultySelect(level)}
            className="w-full p-5 rounded-xl border bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-blue-600/20 hover:border-blue-400 hover:text-white transition-all duration-200 flex items-center justify-between group shadow-lg"
          >
            <span className="font-bold text-lg">{level}</span>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderTopicMenu = () => {
    const filteredTopics = TOPICS.filter(t => t.difficulty === difficulty);

    return (
      <div className="flex flex-col min-h-screen p-6 max-w-6xl mx-auto animate-pop">
        <div className="flex items-center mb-8 gap-4">
          <button onClick={() => setGameState(GameState.MENU_DIFFICULTY)} className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
             <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-white">Chọn Chủ Đề</h2>
            <p className="text-slate-400">{difficulty}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
          {filteredTopics.map((topic) => {
            const Icon = iconMap[topic.icon] || Grid;
            return (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className="relative overflow-hidden rounded-2xl bg-slate-800/60 border border-white/10 hover:bg-slate-800 hover:border-cyan-500/50 p-6 text-left transition-all duration-300 group hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all">
                   <Icon className="w-24 h-24 text-white" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-cyan-500/25 transition-shadow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{topic.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 h-10">{topic.description}</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-cyan-400 uppercase tracking-wider">
                     {topic.words.length} Từ vựng <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {filteredTopics.length === 0 && (
          <div className="text-center text-slate-500 mt-10">
            <p>Đang cập nhật thêm chủ đề cho cấp độ này...</p>
          </div>
        )}
      </div>
    );
  };

  const renderGame = () => {
    const question = questions[currentQIndex];
    if (!question) return null;

    // Handle split examples by '|'
    const examples = question.targetWord.example ? question.targetWord.example.split('|') : [];

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 max-w-3xl mx-auto w-full">
        {showConfetti && <ParticleConfetti />}
        
        {/* Header Stats */}
        <div className="w-full flex justify-between items-center mb-6 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-md border border-white/5">
           <button onClick={resetToTopics} className="mr-2 p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white">
             <ArrowLeft className="w-5 h-5" />
           </button>
          <div className="flex items-center gap-3 flex-1">
             <div className="relative">
                <Zap className={`w-6 h-6 ${stats.streak > 2 ? 'text-yellow-400 fill-yellow-400 animate-pulse' : 'text-slate-400'}`} />
             </div>
             <div className="hidden sm:block">
                <div className="text-xs text-slate-400 uppercase font-bold">Chuỗi</div>
                <div className="font-bold text-lg leading-none">{stats.streak}</div>
             </div>
          </div>
          <div className="text-center flex-1">
            <div className="text-xs text-slate-400 uppercase font-bold">Điểm</div>
            <div className="font-mono text-xl text-cyan-400 font-bold">{stats.score}</div>
          </div>
          <div className="text-right flex-1">
            <div className="text-xs text-slate-400 uppercase font-bold">Tiến độ</div>
            <div className="font-bold text-lg leading-none">{currentQIndex + 1}/{questions.length}</div>
          </div>
        </div>

        {/* Card */}
        <div className="w-full bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="text-center mb-8 relative z-10">
            <div className="flex justify-center items-center gap-2 mb-4">
               <span className="px-3 py-1 rounded-full bg-slate-700/50 text-xs font-bold text-slate-300 border border-white/5">
                 {selectedTopic?.title}
               </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight break-words">
              {question.targetWord.word}
            </h2>
            
            {/* NEW: Enhanced Example Display Area */}
            {isAnswered && examples.length > 0 && (
               <div className="animate-pop mt-6 p-5 bg-slate-700/50 rounded-2xl border border-cyan-500/30 relative text-left">
                  <div className="absolute -top-3 left-4 px-2 bg-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider border border-cyan-500/30 rounded">
                    Ví dụ minh họa
                  </div>
                  <div className="text-slate-300 space-y-2 pt-1">
                    {examples.map((ex, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <BookOpen className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                        <span className="italic">"{ex.trim()}"</span>
                      </div>
                    ))}
                  </div>
               </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid gap-3 relative z-10">
            {question.options.map((option, idx) => {
              let stateStyles = "";
              if (isAnswered) {
                if (idx === question.correctOptionIndex) {
                  stateStyles = "bg-emerald-500/20 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                } else if (idx === selectedOption) {
                  stateStyles = "bg-rose-500/20 border-rose-500 text-rose-100 opacity-75";
                } else {
                  stateStyles = "opacity-40 grayscale";
                }
              } else {
                stateStyles = "bg-slate-700/50 hover:bg-slate-700 border-white/5 hover:border-cyan-400/50 text-slate-200 active:scale-[0.99]";
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 font-medium text-base md:text-lg relative overflow-hidden group ${stateStyles}`}
                >
                  <span className="relative z-10 flex items-start">
                    <span className="inline-block w-6 text-sm opacity-50 mr-2 mt-1 shrink-0">{String.fromCharCode(65 + idx)}.</span>
                    <span>{option}</span>
                  </span>
                  {isAnswered && idx === question.correctOptionIndex && (
                    <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400 animate-pop" />
                  )}
                   {isAnswered && idx === selectedOption && idx !== question.correctOptionIndex && (
                    <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-rose-400 animate-pop" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button Footer */}
          <div className="mt-8 h-14 flex items-center justify-center relative z-10">
            {isAnswered && (
               <div className="w-full animate-pop flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-lg font-bold text-center md:text-left">
                    {selectedOption === question.correctOptionIndex ? (
                       <span className="text-emerald-400 flex items-center justify-center md:justify-start gap-2">
                         Chính xác! <span className="text-sm font-normal text-slate-300 hidden md:inline">{getCompliment(stats.streak)}</span>
                       </span>
                    ) : (
                       <span className="text-rose-400">Sai rồi! Đáp án: {String.fromCharCode(65 + question.correctOptionIndex)}</span>
                    )}
                  </div>
                  <Button onClick={nextQuestion} size="md" className="w-full md:w-auto">
                    {currentQIndex === questions.length - 1 ? 'Tổng kết' : 'Tiếp theo'}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
               </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const percentage = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
    let title = "Cố gắng hơn nhé!";
    let message = "Ôn tập lại chủ đề này để nắm vững hơn.";
    let ColorClass = "text-yellow-400";

    if (percentage >= 90) {
      title = "Xuất Sắc!";
      message = "Bạn đã làm chủ hoàn toàn chủ đề này!";
      ColorClass = "text-emerald-400";
    } else if (percentage >= 70) {
      title = "Làm Tốt Lắm!";
      message = "Vốn từ vựng của bạn rất vững chắc.";
      ColorClass = "text-cyan-400";
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-pop">
         {percentage >= 70 && <ParticleConfetti />}
         
        <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 p-4 rounded-full border-4 border-slate-800">
             <Trophy className={`w-16 h-16 ${ColorClass} fill-current animate-bounce-subtle`} />
          </div>

          <div className="mt-12 space-y-2">
            <h2 className={`text-4xl font-extrabold ${ColorClass}`}>{title}</h2>
            <p className="text-slate-400">{message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
              <div className="text-sm text-slate-400 uppercase font-bold mb-1">Điểm số</div>
              <div className="text-3xl font-mono font-bold text-white">{stats.score}</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
              <div className="text-sm text-slate-400 uppercase font-bold mb-1">Chính xác</div>
              <div className="text-3xl font-mono font-bold text-white">{percentage}%</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 col-span-2 flex items-center justify-between px-8">
               <div className="flex flex-col items-start">
                 <div className="text-sm text-slate-400 uppercase font-bold">Chủ đề</div>
                 <div className="text-lg font-bold text-white">{selectedTopic?.title}</div>
               </div>
               <div className="flex flex-col items-end">
                 <div className="text-sm text-slate-400 uppercase font-bold">Chuỗi Max</div>
                 <div className="text-xl font-bold text-orange-400">{stats.maxStreak} 🔥</div>
               </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <Button onClick={replayTopic} variant="primary">
                Học lại chủ đề này
             </Button>
             <Button onClick={resetToTopics} variant="secondary">
                <Grid className="w-4 h-4 mr-2" /> Chọn chủ đề khác
             </Button>
             <Button onClick={() => setGameState(GameState.MENU_DIFFICULTY)} variant="ghost">
                Đổi cấp độ
             </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-slate-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      {gameState === GameState.MENU_DIFFICULTY && renderDifficultyMenu()}
      {gameState === GameState.MENU_TOPIC && renderTopicMenu()}
      {gameState === GameState.PLAYING && renderGame()}
      {gameState === GameState.RESULT && renderResult()}
    </div>
  );
}

export default App;
