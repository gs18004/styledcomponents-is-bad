import { useState } from "react";
import styles from "./OpacityPicker.module.css";

const ModulesOpacityPicker = () => {
  const [hue, setHue] = useState(1);
  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(Number(e.target.value));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Inline CSS</h1>
      <div
        className={styles.color}
        style={{
          background: `hsl(${hue}, 100%, 50%)`,
        }}
      />
      <input
        className={styles.slider}
        type="range"
        min="0"
        max="360"
        step="0.01"
        value={hue}
        onChange={handleHueChange}
      />
    </div>
  );
};

export default ModulesOpacityPicker;
