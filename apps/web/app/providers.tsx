"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

const providers = ({
  session,
  children,
}: {
  session: Session | null;
  children: ReactNode;
}) => {
  return (
    <SessionProvider
      // refetchInterval={10 * 60}
      // refetchOnWindowFocus
      session={session}
    >
      {children}
    </SessionProvider>
  );
};

export default providers;
