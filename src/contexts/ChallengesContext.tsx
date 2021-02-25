import { createContext, ReactNode, useState } from "react";
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number
  activeChallenge: Challenge;
  experienceToLevelUp: number;
  pastExperienceToLevelUp: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  earnExperience: () => void;
}

interface IChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: IChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [pastExperienceToLevelUp, setPastExperienceToLevelUp] = useState(0);

  const experienceToLevelUp = Math.pow((level + 1) * 4, 2);
  let hp = 1;

  function levelUp() {
    setLevel(level + 1);
    setPastExperienceToLevelUp(experienceToLevelUp);
  }

  function startNewChallenge() {
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengesIndex];
    
    setActiveChallenge(challenge);
  }
  
  function resetChallenge() {
    setActiveChallenge(null);
  }
  
  function earnExperience() {
    setChallengesCompleted(challengesCompleted + 1);
    setCurrentExperience(currentExperience + activeChallenge.amount);
    
    if(currentExperience >= experienceToLevelUp) {
      levelUp();
      experienceToLevelUp;
    }
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        activeChallenge,
        experienceToLevelUp,
        pastExperienceToLevelUp,
        levelUp,
        startNewChallenge,
        resetChallenge,
        earnExperience,
      }}
    >
      { children }
    </ChallengesContext.Provider>
  );
}
