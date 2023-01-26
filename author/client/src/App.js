import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AuthorForm from './components/AuthorForm';
import DisplayAuthor from './components/DisplayAuthor';
import UpdateAuthor from './components/UpdateAuthor';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route element = {<DisplayAuthor/>} path = "/" />
      <Route element = {<AuthorForm/>} path = "/authors/new" />
      <Route element = {<UpdateAuthor/>} path = "/authors/edit/:id" />
    </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
