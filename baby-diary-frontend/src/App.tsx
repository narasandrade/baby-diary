import { Home } from "./pages/Home";
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
