import "./Catalog.css";
import { MyCard } from "../../components";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const Catalog = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) return null;

  const skeletons = Array(8).fill(null);

  return (
    <div className="catalog">
      <h2 className="catalog__name">Catalog</h2>

      <div className="catalog__card">
        {(ctx.products.length ? ctx.products : skeletons).map((product, i) => (
          <MyCard key={product?.id || i} product={product} data-testid="card" />
        ))}
      </div>
    </div>
  );
};
