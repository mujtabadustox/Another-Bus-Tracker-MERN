import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Frontpage from "./view/Frontpage";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Frontpage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
