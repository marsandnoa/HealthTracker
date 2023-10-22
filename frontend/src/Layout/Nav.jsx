import { Link } from "react-router-dom";
// import logo from "../App Components/clown-fish.png";

const Nav = () => {
  return (
    <header className='w-full h-12 flex items-center justify-between bg-blue-500 sticky p-4'>
      <div className='text-xl text-white font-bold flex items-center'>
        HealthTrack
        {/* <img className='w-8 h-8 m-2' src={logo} alt='Fish' /> */}
      </div>
      <nav>
        <ul className='list-none m-0 p-0 flex items-baseline'>
          <li className='ml-10'></li>
          <li className='ml-5'>
            <Link
              className='text-xl text-white font-bold no-underline hover:opacity-80'
              to='/Plot'
            >
              Plot
            </Link>
          </li>
          <li className='ml-5'>
            <Link
              className='text-xl text-white font-bold no-underline hover:opacity-80'
              to='/Exercise'
            >
              Exercise
            </Link>
          </li>
          <li className='ml-5'>
            <Link
              className='text-xl text-white font-bold no-underline hover:opacity-80'
              to='/Calories'
            >
              Calories
            </Link>
          </li>
          <li className='ml-5'>
            <Link
              className='text-xl text-white font-bold no-underline hover:opacity-80'
              to='/Notes'
            >
              Notes
            </Link>
          </li>
          <li className='ml-5'>
            <Link
              className='text-xl text-white font-bold no-underline hover:opacity-80'
              to='/Main'
            >
              Main
            </Link>
          </li>
          <li className='ml-5'>
            <Link
              className='text-xl text-white font-bold no-underline hover:opacity-80'
              to='/Login'
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
