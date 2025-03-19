import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-20 bg-gray-100 flex justify-center items-center mb-20">
      <Link className="text-xl font-bold" href={"/"}>
        Accueil
      </Link>
    </nav>
  );
};

export default Navbar;
