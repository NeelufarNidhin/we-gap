import React from 'react';
import '../Container/App'
import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer, Header } from '../Components/Layout';
import { About, AdminPanel, Home, Login, SignUp } from '../Pages';
import { Provider } from 'react-redux';
import store from '../Storage/Redux/store';



function App() {
  return (
    <div>
      <Provider store={store}>
      <BrowserRouter>
      <Header/>
      <Routes>
      <Route path="/" element= {<Home/>}> </Route>
      <Route path="/AdminPanel" element= {<AdminPanel/>}> </Route>
      <Route path="/About" element= {<About/>}> </Route>
      <Route path="/Login" element= {<Login/>}> </Route>
      <Route path="/SignUp" element= {<SignUp/>}> </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
  
    </Provider>
    </div>
  );
}

export default App;
