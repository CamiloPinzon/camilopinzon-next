import styles from "./global-bg.module.scss";

/**
 * Background atmosférico global — position: fixed, z-index: -1
 * Cero JavaScript. Cero recortes. Los blobs son tan grandes y borrosos
 * que sus bordes se desvanecen de forma natural.
 * Se renderiza server-side, sin hydration cost.
 */
export default function GlobalBg() {
  return (
    <div className={styles.bg} aria-hidden="true">
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
    </div>
  );
}
