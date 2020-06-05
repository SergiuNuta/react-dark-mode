import React from 'react';
import styles from "./App.module.scss";
import sun from "./images/sun.png";
import moon from "./images/moon.png";

function App() {
  const [darkMode, setDarkMode] = React.useState(getInitialMode());

  React.useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    const userPrefersDark = getPreferColorScheme();
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) {
      return true;
    } else {
      return false;
    }
  }

  function getPreferColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)");
  }

  return (
    <div className={styles.wrapper}>
      <div className={darkMode ? styles.darkModeStyle : styles.lightModeStyle}>
        <nav>
          <div className={styles.toggleContainer}>
            <span className={styles.toggle}>
              <input
                checked={darkMode}
                onChange={() => setDarkMode(prevMode => !prevMode)}
                type="checkbox"
                className={styles.checkbox}
                id={styles.checkbox} />
              <label htmlFor="checkbox" />
            </span>
          </div>
        </nav>
        <div className={styles.card}>
          <main>
            <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
            <img src={darkMode ? moon : sun} alt={darkMode ? "moon picture" : "sun picture"} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
