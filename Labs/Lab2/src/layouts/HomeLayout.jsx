import CurouselBanner from "../components/CurouselBanner";
import ListOfOrchid from "../components/ListOfOrchid";
import listOrchids from "../data/listOrchids";

function HomeLayout({ searchTerm }) {
  return (
    <div className="page-wrapper">
      <CurouselBanner />
      <div className="container">
        <section className="products-section">
          <ListOfOrchid orchids={listOrchids} searchTerm={searchTerm} />
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
