import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToLevelUp } = useContext(ChallengesContext);

  const percentToLevelUp = Math.round(currentExperience * 100) / experienceToLevelUp;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToLevelUp}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentToLevelUp}%` }}>
          {currentExperience}&nbsp;xp
        </span>
      </div>
      <span>{experienceToLevelUp} xp</span>
    </header>
  )
}
