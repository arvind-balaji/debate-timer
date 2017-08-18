import Timer from './Timer';
import Settings from './Settings';
import Help from './Help';
import React from 'react';
import { Switch, Route } from 'react-router-dom'

const App = () => (
  <div>
        <Switch>
            <Route exact path='/' component={Timer}/>
            {/* both /roster and /roster/:number begin with /roster */}
            <Route path='/settings' component={Settings}/>
            <Route path='/help' component={Help}/>
        </Switch>
    </div>
)

export default App;
