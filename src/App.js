import React from 'react';
import { Router } from "@reach/router"
import HomePage from './components/HomePage'
import ChatPage from './components/ChatPage'

function App() {
  const NotFound = () => <div><p>404 NOT FOUND</p></div>

  return (
    <Router>
      <HomePage path="/" />
      <ChatPage path="/chat" /> 
      <NotFound path="/*"/>
    </Router>
  );
}

export default App;
