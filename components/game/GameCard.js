import PropTypes from 'prop-types';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

function GameCard({
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  id,
  onUpdate,
}) {
  const deleteThisGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Dropdown>
        <Dropdown.Toggle className="dropdownBtn">
          Options
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href={`/games/${id}`}>View</Dropdown.Item>
          <Dropdown.Item href={`/games/edit/${id}`}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={deleteThisGame}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
