import { useState, useEffect } from "react";

import UserContext from './contexts/UserContext';

import LoginForm from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return (
    <div className="App">
      <UserContext.Provider value={{ token, setToken }}>
        {!token && <LoginForm />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
