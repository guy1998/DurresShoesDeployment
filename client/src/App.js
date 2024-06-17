
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import LoginPage from "./pages/login";
import "./App.css"

function App() {
  return (
    <div className="app">
      <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
