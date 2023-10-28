import Link from "next/link";

function Landing(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <Link href="api/auth/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Landing;
