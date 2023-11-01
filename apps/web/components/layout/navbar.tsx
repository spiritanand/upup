import Link from "next/link";

const navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="api/auth/signin">Sign In</Link>
        </li>
      </ul>
    </nav>
  );
};

export default navbar;
