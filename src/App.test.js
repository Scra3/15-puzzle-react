import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App successPuzzle={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, false]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should shuffle the puzzle', () => {
  const successPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, false];

  expect(genetareShufflePuzzle(successPuzzle)).not.toEqual(successPuzzle);
});
