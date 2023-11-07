import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Hero from "../components/home/hero";
import { authOptions } from "./api/auth/[...nextauth]/route";

async function Landing(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (session?.user) return redirect("/dashboard");

  return <Hero />;
}

export default Landing;
