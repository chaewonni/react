import { Outlet, Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path=":movieId" element={<DetailPage />} />
            <Route index element={<SearchPage />} />
          </Route>
        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
