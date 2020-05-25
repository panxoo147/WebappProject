import React from 'react';
import Home from './HomePage/Home';
import {Route,Switch} from 'react-router-dom'
import NavBar from './navBar/NavBar';
import LoginComponent from './login/LoginComponent'
import Course from './Course/Course'

import CourseDetail from './CourseDetail/CourseDetail'
function App(props) {
  return ( 
  <div style={{minWidth:1050}}>
  
  <NavBar/>
      <Switch>

        <Route path='/' exact component={Home}/>
        <Route path='/Course' exact component={Course}/>
        <Route path='/login' component={LoginComponent} />
        <Route path='/CourseDetail' component={CourseDetail} />
      </Switch>
     
    </div>
  );
}

export default App;
