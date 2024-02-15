import React from 'react';
import { Container } from './Container';
import Header from './Header';

export const ContainerHeader = ({ title, children, goBack }) => {
  return (
    <Container>
      <Header title={title} goBack={goBack} />
      {children}
    </Container>
  );
};
