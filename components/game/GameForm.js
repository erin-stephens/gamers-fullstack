import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

const GameForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    // Send POST request to your API
    createGame(game).then(() => router.push('/games'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" required value={currentGame.title} onChange={handleChange} />
        </Form.Group>
        <FloatingLabel controlId="floatingInput1" label="Game Maker" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter game maker"
            name="maker"
            value={currentGame.maker}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Number of Players" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter number of players"
            name="numberOfPlayers"
            value={currentGame.numberOfPlayers}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput3" label="Skill Level" className="mb-3">
          <Form.Control
            type="number"
            placeholder="Enter Skill Level"
            name="skillLevel"
            value={currentGame.skillLevel}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect">
          <Form.Select
            aria-label="GameType"
            name="gameTypeId"
            onChange={handleChange}
            className="mb-3"
            required
          >
            <option value="">Select a Game Type</option>
            {
                gameTypes.map((gameType) => (
                  <option
                    key={gameType.id}
                    value={gameType.id}
                  >
                    {gameType.label}
                  </option>
                ))
              }
          </Form.Select>
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
