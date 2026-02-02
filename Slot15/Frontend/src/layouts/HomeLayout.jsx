import { useState, useEffect } from "react";
import CurouselBanner from "../components/CurouselBanner";
import ListOfOrchid from "../components/ListOfOrchid";
import { getAllOrchids } from "../utils/orchidApi";

function HomeLayout({ searchTerm = "" }) {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrchids = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getAllOrchids();
        setOrchids(res.data);
      } catch (err) {
        console.error("Lỗi lấy dữ liệu từ API:", err);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchOrchids();
  }, []);

  return (
    <div className="page-wrapper">
      <CurouselBanner />

      <div className="container">
        <section className="products-section">
          {loading && <p>Đang tải dữ liệu...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <ListOfOrchid
              orchids={orchids}
              searchTerm={searchTerm}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default HomeLayout;
