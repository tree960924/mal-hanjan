import './App.css';
import {Switch, Route} from 'react-router-dom';
import {Home, Login, Signup} from "./pages";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
