import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Welcome.module.css';

export default function Welcome() {
  const { logout, token } = useAuth();
  const navigate = useNavigate();

  const getUsername = () => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || 'Player';
    } catch {
      return 'Player';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logoArea}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="20" fill="#0070d1" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="sans-serif">P</text>
            </svg>
            <span className={styles.brand}>PlayStation</span>
          </div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Welcome back,</h1>
          <h2 className={styles.heroName}>{getUsername()}</h2>
          <p className={styles.heroSubtitle}>
            You are now signed in to your PlayStation account. Enjoy your gaming experience.
          </p>
        </section>

        <section className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🎮</span>
            <h3 className={styles.cardTitle}>Game Library</h3>
            <p className={styles.cardBody}>Access your full collection of PlayStation titles.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>👥</span>
            <h3 className={styles.cardTitle}>Friends</h3>
            <p className={styles.cardBody}>Connect and play with friends online.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🏆</span>
            <h3 className={styles.cardTitle}>Trophies</h3>
            <p className={styles.cardBody}>Track your achievements and trophy collection.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
