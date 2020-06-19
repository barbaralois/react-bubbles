import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  };

  const login = (evt) => {
    evt.preventDefault();
    axiosWithAuth()
      .post('/api/login', credentials)
      .then((res) => {
        // res.data.payload
        window.localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch((err) => {
        console.log('Error:', err.response.data.error);
      });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={login}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
