
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import LoginForm from "./pages/login/login";

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<div><LoginForm /></div>} />
          </Routes>
      </Router>
  );
}

export default App;
