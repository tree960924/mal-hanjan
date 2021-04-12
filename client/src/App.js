import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Home, Login, Signup} from "./pages";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/login"component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/">
          Home!!
        </Route>
      </Switch>
    </div>
  );
}

export default App;
