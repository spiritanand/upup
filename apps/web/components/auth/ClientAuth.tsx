import { useSession } from "next-auth/react";

function ClientAuth({ children }: { children: React.ReactNode }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}

export default ClientAuth;
