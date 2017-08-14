import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';
import Settings from './Settings';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Settings />, document.getElementById('root'));
registerServiceWorker();
