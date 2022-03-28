import React, { Component } from 'react';
import DetailResultatEvaluation from './DetailResultatEvaluation';
import { getResultatEvaluationById } from './EvaluationSlice';
 
class App extends Component {
    
    
  render() {
    {console.log(getResultatEvaluationById);}
    return (
      <div>
        <DetailResultatEvaluation  />
      </div>
    );
  }
}
 
export default App;