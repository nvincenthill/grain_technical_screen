// Challenge

// Build a tic-tac-toe game using React.
// Create a NxN board (initialized as a 3x3 board)
// User should be able to click on a square/cell and the application should alternate between ❌ & ⭕️’s. No need for a computer player.

// Application should detect that there was a winner and prompt to start game over. As well as prompting to start over when there is a tie. A winner is detected with all the values are the same:

// vertically
// horizontally
// or diagonally

// Bonus Points
// Make it look pretty
// Keep track of the score (Player A , Player B , ties)

import React, { Component } from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
  text-align: center;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const Header = styled.header`
  background-color: #0f1343;
  min-height: 20vh;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 1rem;
  color: white;
`;

const StyledBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 10rem;
  text-align: center;
  align-content: center;
`;

const StyledCell = styled.div`
  width: 3rem;
  height: 3rem;
  background: #222;
  color: #eee;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 2px solid #eee;
`;

const StyledButton = styled.button`
  border: 2px solid #eee;
  background: #222;
  color: #eee;
  margin: 0 1rem;
`;

class Board extends Component {
  constructor() {
    super();
    this.state = {
      gameState: [['T', 'I', 'C'], ['T', 'A', 'C'], ['T', 'O', 'E']],
      currentPlayer: 1,
      plays: 0,
      isPlaying: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.switchPlayer = this.switchPlayer.bind(this);
    this.validateGame = this.validateGame.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({
      isPlaying: true,
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      plays: 0
    });
  }

  handleClick(x, y) {
    let { gameState, currentPlayer, plays, isPlaying } = this.state;

    if (!isPlaying) {
      alert('Please start a new game!');
      return;
    }

    if (gameState[x][y] !== 0) {
      alert('Please select an empty cell');
      return;
    }

    if (currentPlayer === 1) {
      gameState[x][y] = 1;
    } else {
      gameState[x][y] = -1;
    }

    this.setState({ gameState, plays: (plays += 1) });

    this.validateGame(gameState);
    this.switchPlayer();
  }

  validateGame(currentStateOfGame) {
    const board = currentStateOfGame;
    const { plays, currentPlayer } = this.state;

    // check for row wins
    for (let row = 0; row < board.length; row++) {
      if (
        board[row][0] !== 0 &&
        board[row][0] === board[row][1] &&
        board[row][0] === board[row][2]
      ) {
        // declare a win
        alert(`Player ${currentPlayer} wins!`);
        this.setState({
          isPlaying: false
        });
        return;
      }

      for (let col = 0; col < board.length; col++) {
        if (
          board[row][col] !== 0 &&
          board[0][col] === board[1][col] &&
          board[0][col] === board[2][col]
        ) {
          // declare a win
          alert(`Player ${currentPlayer} wins!`);
          this.setState({
            isPlaying: false
          });
          return;
        }

        // validate diagonals
        try {
          if (
            board[row][col] !== 0 &&
            board[row][col] === board[row + 1][col + 1] &&
            board[row][col] === board[row + 2][col + 2]
          ) {
            // declare a win
            alert(`Player ${currentPlayer} wins!`);
            this.setState({
              isPlaying: false
            });
            return;
          }
        } catch (error) {
          // do nothing
        }

        try {
          if (
            board[row][col] !== 0 &&
            board[row][col] === board[row + 1][col - 1] &&
            board[row][col] === board[row + 2][col - 2]
          ) {
            // declare a win
            alert(`Player ${currentPlayer} wins!`);
            this.setState({
              isPlaying: false
            });
            return;
          }
        } catch (error) {
          // do nothing
        }
      }
    }

    if (plays === 8) {
      // declare a draw
      alert('DRAW');
      this.setState({
        isPlaying: false
      });
      return;
    }
  }

  switchPlayer() {
    const { currentPlayer } = this.state;
    const newPlayer = currentPlayer === 1 ? 2 : 1;
    this.setState({ currentPlayer: newPlayer });
  }

  render() {
    const { gameState, isPlaying } = this.state;
    const cells = gameState.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        let displayedText;

        switch (cell) {
          case 0:
            displayedText = '';
            break;
          case 1:
            displayedText = 'X';
            break;
          case -1:
            displayedText = 'O';
            break;
          default:
            displayedText = cell;
            break;
        }

        return (
          <StyledCell onClick={() => this.handleClick(rowIndex, colIndex)}>
            {displayedText}
          </StyledCell>
        );
      });
    });

    return (
      <React.Fragment>
        <StyledBoard>{cells}</StyledBoard>
        <StyledButton onClick={this.startGame}>
          {isPlaying ? 'RESTART' : 'START'}
        </StyledButton>
      </React.Fragment>
    );
  }
}

const StyledBoardContainer = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Header>
          <h1>Tic Tac Toe</h1>
        </Header>
        <StyledBoardContainer>
          <Board />
        </StyledBoardContainer>
      </StyledApp>
    );
  }
}

export default App;
