import { AuthProvider } from "@/context/features/AuthContext";

function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProviders;
