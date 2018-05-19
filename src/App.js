import React, {Component} from 'react';
import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      puzzle: this.genetareShufflePuzzle(props.successPuzzle)
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

  genetareShufflePuzzle(puzzle) {
    let newPuzzle = [];
    for (var i = 1; i <= puzzle.length - 1; i++) {
      newPuzzle.push(i);
    }
    newPuzzle.push(false);

    return this.shuffle(newPuzzle);
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
    const { puzzle } = this.state;
    const { successPuzzle } = this.props;
    let isWon = true;

    console.log(successPuzzle);
    console.log(successPuzzle);
    successPuzzle.every((square, i) => {
      if (square !== puzzle[i]) {
        isWon = false;
        return;
      }
    });

    return isWon;
  }

  render() {
    return (
      <div className='container'>
        <div className='App'>
          {this.displayPuzzle()}
          {this.success() && <div>WIN</div>}
        </div>
      </div>
    );
  }
}

export default App;
