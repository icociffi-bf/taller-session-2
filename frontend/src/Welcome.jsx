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

        <section className={styles.certSection}>
          <h2 className={styles.certSectionTitle}>🤖 Certificaciones Microsoft AI 2026</h2>
          <p className={styles.certSectionSubtitle}>
            Las últimas certificaciones de Microsoft en Inteligencia Artificial para 2026.
          </p>
          <div className={styles.cards}>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Nuevo</span>
              <h3 className={styles.cardTitle}>Azure AI Cloud Developer Associate</h3>
              <p className={styles.certCode}>AI-200</p>
              <p className={styles.cardBody}>
                Reemplaza a Azure Developer Associate (AZ-204). Disponible desde julio 2026.
                Enfocado en construir y desplegar soluciones de IA en Azure.
              </p>
            </div>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Nuevo</span>
              <h3 className={styles.cardTitle}>Azure AI Apps and Agents Developer Associate</h3>
              <p className={styles.certCode}>AI-102 Sucesor</p>
              <p className={styles.cardBody}>
                Reemplaza a Azure AI Engineer Associate. Cubre el desarrollo de aplicaciones y
                agentes de IA en la plataforma Microsoft Azure.
              </p>
            </div>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Nuevo</span>
              <h3 className={styles.cardTitle}>Cloud and AI Security Engineer Associate</h3>
              <p className={styles.certCode}>SC-500</p>
              <p className={styles.cardBody}>
                Reemplaza a Azure Security Engineer Associate (AZ-500). Disponible desde julio 2026.
                Seguridad en entornos Cloud e Inteligencia Artificial.
              </p>
            </div>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Nuevo</span>
              <h3 className={styles.cardTitle}>Intelligent Applications Builder Associate</h3>
              <p className={styles.certCode}>AB-410</p>
              <p className={styles.cardBody}>
                Reemplaza a Power Platform Functional Consultant Associate (PL-200).
                Construcción de aplicaciones inteligentes con Power Platform.
              </p>
            </div>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Nuevo</span>
              <h3 className={styles.cardTitle}>Machine Learning Operations Engineer Associate</h3>
              <p className={styles.certCode}>MLOps</p>
              <p className={styles.cardBody}>
                Reemplaza a Azure Data Scientist Associate. Operaciones de Machine Learning
                en la plataforma Azure para la solución Data &amp; AI.
              </p>
            </div>
            <div className={styles.certCard}>
              <span className={styles.certBadge}>Nuevo</span>
              <h3 className={styles.cardTitle}>Agentic AI Business Solutions Architect</h3>
              <p className={styles.certCode}>Expert</p>
              <p className={styles.cardBody}>
                Nueva certificación de nivel Expert que reemplaza varias certificaciones de
                Dynamics 365 y Power Platform, con foco en soluciones de IA agéntica empresarial.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
