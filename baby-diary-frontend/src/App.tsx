import { Home } from "./pages/Home";
import AppProviders from "./context/AppProviders";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <Home />
    </AppProviders>
  );
}

export default App;
