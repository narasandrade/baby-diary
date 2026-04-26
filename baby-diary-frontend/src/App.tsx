import { Home } from "./pages/home";
import { AppProvider } from "./context/AppProvider";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
