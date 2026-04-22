import { BRANDS } from "@/lib/constants";

import "./brands.css";

export default function Brands() {
  return (
    <section className="brands-section" aria-labelledby="brands-title">
      <div className="section-wrapper">
        <header className="section-header">
          <h2 className="section-title" id="brands-title">
            Marcas que confían en mi trabajo
          </h2>
          <p className="brands-subtext">
            He ayudado a empresas a crear experiencias digitales poderosas. La
            tuya podría ser la siguiente.
          </p>
        </header>
        <div className="brands-marquee-wrapper" aria-label="Marcas clientes">
          <div className="brands-marquee" aria-hidden="true">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div key={i} className="brand-chip">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
