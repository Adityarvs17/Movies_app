import { Link } from "react-router-dom";// ✅ correct relative path
import { assets } from "../../assets/assets";

export default function AdminNavbar() {
  return (
    <nav className="w-full text-white h-16 flex items-center justify-start px-6">
      <div className="flex justify-between items-center w-full h-16 border-b border-gray-300/20">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="w-36 h-auto" />
        </Link>
      </div>
    </nav>
  );
}
