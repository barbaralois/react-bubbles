import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import Login from './components/Login';
import './styles.scss';
import { BubblesContext } from './contexts/BubblesContext';
import { axiosWithAuth } from './utils/axiosWithAuth';

function App() {
  const [colorList, setColorList] = useState([]);
  const getColors = () => {
    axiosWithAuth()
      .get('http://localhost:5000/api/colors')
      .then((res) => setColorList(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Router>
      <BubblesContext.Provider value={{ getColors, colorList, setColorList }}>
        <div className="App">
          <PrivateRoute path="/bubbles" component={BubblePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/">
            <div>
              <h1>Welcome to the Bubble App!</h1>
              <Link to="/login">Click Here to Login</Link>
            </div>
          </Route>
        </div>
      </BubblesContext.Provider>
    </Router>
  );
}

export default App;
