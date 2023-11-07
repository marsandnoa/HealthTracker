import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout/Layout';
import Main from './Pages/Main';
import Auth from './Login/Auth';
import Homepage from './Pages/Homepage';
import Exercise from './Pages/Exercise';
import Calories from './Pages/Calories';
import Plot from './Pages/Plot';
import Notes from './Pages/Notes';
import { UserProvider } from './UserContext';
function App() {
  const location = useLocation();
  const layoutRoutes = ['/Main', '/Exercise','/Calories','/Notes','/Plot']; // Routes that should have the Layout
  const shouldHaveLayout = layoutRoutes.includes(location.pathname);

  return (
    <UserProvider>
      {shouldHaveLayout ? (
        <Layout>
          <Routes>
            <Route path='/Main' element={<Main />} />
            <Route path='/Exercise' element={<Exercise />} />
            <Route path='/Calories' element={<Calories />} />
            <Route path='/Notes' element={<Notes />} />
            <Route path='/Plot' element={<Plot />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Login' element={<Auth />} />
        </Routes>
      )}
    </UserProvider>
  );
}


export default App;
