import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListOfOrchid from "./components/ListOfOrchid";
import OrchidsData from "./data/listOrchids";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <ListOfOrchid orchids={OrchidsData} />
      <Footer avatar="/images/anh.jpg" name="Phat" email="Phat@fpt.edu.vn" />
    </div>
  );
}

export default App;