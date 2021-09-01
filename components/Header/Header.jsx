import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-purple-500 px-20 py-4 shadow-md">
      <Link href="/">
        <a>
          <div className="font-semibold text-gray-100 text-lg">Drone Drop Delivery</div>
        </a>
      </Link>
    </header>
  );
};

export default Header;
