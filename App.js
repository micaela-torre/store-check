import React, {Suspense} from 'react';
import {Container} from './src/components/Container';
import {Navigation} from './src/navigation/Navigation';

const App = () => {
  return (
    <Suspense fallback={<h1>Cargando...</h1>}>
      <Container>
        <Navigation />
      </Container>
    </Suspense>
  );
};

export default App;
