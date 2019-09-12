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

class App extends Component {
  constructor() {
    super();
    this.state = {
      hello: 'world'
    };
  }

  render() {
    return (
      <StyledApp>
        <Header>
          <h1>Technical Screen Boilerplate</h1>
        </Header>
      </StyledApp>
    );
  }
}

export default App;
