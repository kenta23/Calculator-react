import React, {useReducer} from 'react'
import { ACTIONTYPE } from './Actiontype';

const initialState = {
  displayValue: '0',
  previousVal: [],
  operator: null,
  firstOperand: null,
  secondOperand: null,
};

const reducer = (state, action) => {
  switch(action.type) {
    case ACTIONTYPE.INPUT:
      if(state.displayValue === '0') {
        return {
          ...state, displayValue: action.payload
        };
      }else {
        return {
          ...state, displayValue: state.displayValue + action.payload
        }
      }
      case ACTIONTYPE.OPERATOR: 
      return {
        ...state,
        operator: action.payload,
        firstOperand: state.displayValue,
        displayValue: '0',
        previousVal: [...state.previousVal, state.displayValue, action.payload],
      }
      case ACTIONTYPE.EQUALS:
          if(state.operator && state.firstOperand && state.displayValue) {
             const result = calculatorResult(
              parseFloat(state.firstOperand),
              parseFloat(state.displayValue),
              state.operator
             );

             return {
              ...state,
              displayValue: String(result),
              operator: null,
              firstOperand: null,
              secondOperand: null,
              previousVal: [...state.previousVal, state.displayValue, '='],
             };
          }
          return state;
          
      case ACTIONTYPE.DELETE: 
          if(state.displayValue.length === 1) {
             return {
              ...state,
              displayValue: '0'
             }
          }
          else {
            return {
              ...state,
              displayValue: state.displayValue.slice(0, -1)
            }
          }
      case ACTIONTYPE.DECIMALPOINT:
        if(!state.displayValue.includes('.')) {
            return {
              ...state,
              displayValue: state.displayValue + '.'
            }
        }
        return state

      case ACTIONTYPE.CLEAR:
          return initialState;
      default:
         return state;
  }
};

const calculatorResult = (operand1, operand2, operator) => {
  switch(operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2
    case '*':
      return operand1 * operand2
    case '/':
      return operand1 / operand2
    default:
      return 0;
  }

};


const App = () => {
  const[state, dispatch] = useReducer(reducer, initialState);

  const handleInput = (number) => {
    dispatch({type: ACTIONTYPE.INPUT, payload: number});
  }

  const handleOperator = (operator, e) => {
    
    dispatch({
      type: ACTIONTYPE.OPERATOR, 
      payload: operator
    });
  }
  const handleEquals = () => {
    dispatch({type: ACTIONTYPE.EQUALS});
  }

  const handleClear = () => {
    dispatch({ type: ACTIONTYPE.CLEAR});
  };

  
  return (
    <div className='container'>
      <div className='calculator'>
        <div className='output'>
          <div className='prev-output'>
            {state.previousVal.map((item, index)  => (
                <span className='prev-number' key={index}>{item}</span>
            ))}
          </div>
          <div className='current-output'>
            <h1 className='current-number'>{state.displayValue}</h1>
          </div>
        </div>
        <button className='span-two' onClick={() => handleClear()}>AC</button>
        <button onClick={() => dispatch({type: ACTIONTYPE.DELETE})}>DEL</button>
        <button onClick={() => handleOperator('*')} value={state.operatorValue}>*</button>
        <button onClick={() => handleInput('1')}>1</button>
        <button onClick={() => handleInput('2')}>2</button>
        <button onClick={() => handleInput('3')}>3</button>
        <button onClick={() => handleOperator('+')} value={state.operatorValue}>+</button>
        <button onClick={() => handleInput('4')}>4</button>
        <button onClick={() => handleInput('5')}>5</button>
        <button onClick={() => handleInput('6')}>6</button>
        <button onClick={() => handleOperator('-')} value={state.operatorValue}>-</button>
        <button onClick={() => handleInput('7')}>7</button>
        <button onClick={() => handleInput('8')}>8</button>
        <button onClick={() => handleInput('9')}>9</button>
        <button onClick={() => handleOperator('/')} value={state.operatorValue}>/</button>
        <button onClick={() => dispatch({type: ACTIONTYPE.DECIMALPOINT})}>.</button>
        <button onClick={() => handleInput('0')}>0</button>
        <button className='span-two' onClick={() => handleEquals()}>=</button>

      </div>

    </div>
  )
}

export default App