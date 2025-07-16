import "./Catalog.css";
import { MyCard } from "../../components";

export const Catalog = () => {
  return (
    <>
      <div className="catalog">
        <h2>Catalog</h2>

        <div className="catalog__card">
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
          <MyCard />
        </div>
      </div>
    </>
  );
};
