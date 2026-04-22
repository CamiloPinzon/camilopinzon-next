import { BRANDS } from "@/lib/constants";

import styles from "./brands.module.scss";

export default function Brands() {
  return (
    <section className={styles.section} aria-labelledby="brands-title">
      <div className="section-wrapper">
        <header className="section-header">
          <h2 className="section-title" id="brands-title">
            Marcas que confían en mi trabajo
          </h2>
          <p className={styles.subtext}>
            He ayudado a empresas a crear experiencias digitales poderosas. La
            tuya podría ser la siguiente.
          </p>
        </header>
        <div className={styles.marqueeWrapper} aria-label="Marcas clientes">
          <div className={styles.marquee} aria-hidden="true">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div key={i} className={styles.chip}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
