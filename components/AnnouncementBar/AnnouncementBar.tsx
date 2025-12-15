import React from 'react';
import styles from './AnnouncementBar.module.css';

const AnnouncementBar: React.FC = () => {
  const items = Array.from({ length: 8 }, () => 'Appscrip');

  return (
    <div className={styles.bar} aria-label="Appscrip announcement">
      <div className={styles.inner}>
        {items.map((text, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.icon}>★</span>
            <span className={styles.text}>{text}</span>
          </div>
        ))}
        {items.map((text, index) => (
          <div key={`dup-${index}`} className={styles.item}>
            <span className={styles.icon}>★</span>
            <span className={styles.text}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;

