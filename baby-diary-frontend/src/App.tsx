import { Home } from "./pages/home";
import "./App.css";
import AppProviders from "./context/AppProviders";

function App() {
  return (
    <AppProviders>
      <Home />
    </AppProviders>
  );
}

export default App;
