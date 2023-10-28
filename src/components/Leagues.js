import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

function Leagues() {
  return (
    <div>
      <Button text="Gwyr League" as={Link} to="gwyr" />
      <Button text="Copr League" as={Link} to="copr" />
    </div>
  );
}

export default Leagues;
