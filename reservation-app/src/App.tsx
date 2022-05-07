import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Login from "./pages/login";
import Home from "./pages/home";
import BuildInfo from "./components/buildinfo";
import { UserProvider } from "./components/usercontext";
import Navigation from "./components/navigation";
import InventoryPage from "./pages/inventory";
import UserPermissionsPage from "./pages/userPermissions";
import About from "./pages/about";

function App() {
  return (
    <Router>
    <div>
      <BuildInfo />
      <UserProvider>
        <Navigation />
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/home/" exact>
          <Home />
        </Route>
        <Route path="/inventory/" exact>
          <InventoryPage />
        </Route>
        <Route path="/userpermissions/" exact>
          <UserPermissionsPage />
        </Route>
        <Route path="/about/" exact>
          <About />
        </Route>
      </UserProvider>
    </div>

  </Router>
  );
}

export default App;
