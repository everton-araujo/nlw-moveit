import { useContext, useState } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
  const { currentExperience, experienceToLevelUp, pastExperienceToLevelUp, level } = useContext(ChallengesContext);

  const diffBetweenXpToLvlUpAndPastXp = experienceToLevelUp - pastExperienceToLevelUp;
  const surplusExperience = currentExperience >= experienceToLevelUp ? currentExperience - experienceToLevelUp : 0;
  
  let percentBar;

  if (surplusExperience !== 0) {
    percentBar = (surplusExperience * 100) / diffBetweenXpToLvlUpAndPastXp;
  } else {
    percentBar = ((currentExperience - pastExperienceToLevelUp) * 100) / diffBetweenXpToLvlUpAndPastXp;
  }

  return (
    <header className={styles.experienceBar}>
      <span>{pastExperienceToLevelUp} xp</span>
      <div>
        {/* <div>{Math.round((4 * Math.pow(level, 3)) / 5)}</div> */}
        <div style={{ width: `${percentBar}%` }} />
        <span className={styles.currentExperience} style={{ left: `${percentBar}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToLevelUp} xp</span>
    </header>
  )
}
