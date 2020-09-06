import React from 'react';
import './App.scss';
import Rubricator from './Rubricator/Rubricator';
import pointsResponse from './points.json';

function App() {
  const points = React.useMemo(() => pointsResponse.results, []);

  return (
    <div className="App">
      <Rubricator points={points} />
    </div>
  );
}

export default App;
