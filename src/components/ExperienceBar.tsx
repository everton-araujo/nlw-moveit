import { useContext } from 'react';
import CountUp from 'react-countup';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToLevelUp, pastExperience } = useContext(ChallengesContext);

  const percentToLevelUp = Math.round(currentExperience * 100) / experienceToLevelUp;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToLevelUp}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToLevelUp}%` }}>
          <CountUp 
            start={pastExperience} 
            end={currentExperience} 
            duration={3}
          />&nbsp;xp
        </span>
      </div>
      <span>{experienceToLevelUp} xp</span>
    </header>
  )
}
