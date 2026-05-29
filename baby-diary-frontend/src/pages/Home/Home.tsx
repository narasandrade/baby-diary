import { useAuth0 } from "@auth0/auth0-react";
import { NavBar } from "../../components/NavBar";
import { Activities } from "./Activities";

export function Home() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <Activities />
    </div>
  );
}
