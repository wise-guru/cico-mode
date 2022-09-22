import "./App.css";
import Header from "./components/Header";
import { HashRouter } from "react-router-dom";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
