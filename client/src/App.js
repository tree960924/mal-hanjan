import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Home, Login, Signup, Sayings} from "./pages";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/login"component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/sayings" component={Sayings}/>
        <Route exact path="/"component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
