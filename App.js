import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      successPuzzle: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, false],
      puzzle: this.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, false])
    };
  }

  shuffle(puzzle) {
    const min = 0;
    const max = puzzle.length - 1;

    puzzle.forEach((square, i) => {
      const swapSquareIndex = this.getRandomInt(min, max);
      [puzzle[swapSquareIndex], puzzle[i]] = [puzzle[i], puzzle[swapSquareIndex]];
    });

    return puzzle;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  displayPuzzle() {
    const {puzzle} = this.state;

    return (
      <div className='puzzle'>
        {puzzle.map((square, i) =>
          <div key={i} className={this.getSquareClassName(square)} onClick={() => this.shift(i)}>
            {!!square ? square : 'empty'}
          </div>
        )}
        {this.success() && <div>WIN</div>}
      </div>
    );
  }

  getSquareClassName(value) {
    if(!value){
      return 'puzzle--square-empty';
    }

    return value % 2 === 0 ? 'puzzle--square-pair' : 'puzzle--square-odd'
  }

  shift(index) {
    const {puzzle} = this.state;
    //Left square
    if (index % 4 !== 0 && puzzle[index - 1] === false) {
      puzzle[index - 1] = puzzle[index];
      puzzle[index] = false;
    }
    //Right square
    else if ((index + 1) % 4 !== 0 && puzzle[index + 1] === false) {
      puzzle[index + 1] = puzzle[index];
      puzzle[index] = false;
    }
    //Up square
    else if (index > 3 && puzzle[index - 4] === false) {
      puzzle[index - 4] = puzzle[index];
      puzzle[index] = false;
    }
    //Below square
    else if (index < 12 && puzzle[index + 4] === false) {
      puzzle[index + 4] = puzzle[index];
      puzzle[index] = false;
    }

    this.setState({puzzle: puzzle});
  }

  success() {
    const {successPuzzle, puzzle} = this.state;

    return successPuzzle.every((square, i) => {
      if (square !== puzzle[i]) {
        return false;
      }

      return true;
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='App'>
          {this.displayPuzzle()}
        </div>
      </div>
    );
  }
}

export default App;
