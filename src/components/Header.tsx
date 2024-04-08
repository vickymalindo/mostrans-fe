import { Link } from 'react-router-dom';
import MostransLogo from './../assets/images/logo_mostrans.png';

const Header = () => {
  return (
    <header className="sticky top-0 z-10">
      <nav className="flex items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white border-b-2 ">
        <div>
          <Link to="/">
            <img
              src={MostransLogo}
              alt="logo_mekar"
              className="h-20 w-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
            />
          </Link>
        </div>

        <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
          <li>
            <Link
              to="/character-by-location"
              className="md:p-4 py-2 block hover:text-green-400 text-lg sm:text-xl md:text-2xl"
            >
              Location
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
