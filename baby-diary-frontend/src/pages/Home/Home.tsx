import { useAuth0 } from "@auth0/auth0-react";
import { ActivityList, NavBar, Sidebar } from "@/components";

export function Home() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <ActivityList />
        <Sidebar />
      </div>
    </div>
  );
}
