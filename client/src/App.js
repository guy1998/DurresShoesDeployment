
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import LoginPage from "./pages/login";
import AdminView from "./pages/admin"
import "./App.css"

function App() {
  return (
    <div className="app">
      <Router>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/app*" element={<AdminView />}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
