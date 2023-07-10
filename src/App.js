import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Board, Thread } from './pages';



function App() {


  return (
  <Routes><>
      <Route
        index
        element={<Home/>}
        exact={true}
        path="/"
      />
      <Route
        index
        element={<Board/>}
        exact={true}
        path="/:board/"
      />
      <Route
        index
        element={<Thread/>}
        exact={true}
        path="/:board/thread/:threadId"
      />
          </>
    </Routes>
  );
}

export default App;