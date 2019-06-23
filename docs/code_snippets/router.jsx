import * as React from 'react';
import {
  BrowserRouter as Router, Route, Link
} from 'react-router-dom';

const Home = () => ( <div> <h2>Home</h2> </div> );
const About = () => ( <div> <h2>About</h2> </div> );

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

<Router>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/about" component={About}/>
    <Route component={NoMatch}/>
  </Switch>
</Router>