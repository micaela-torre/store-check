import React from 'react';
import { Container } from './src/components/Container';
import { Navigation } from './src/navigation/Navigation';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <Container>
        <Navigation />
      </Container>
    </PaperProvider>
  );
};

export default App;
