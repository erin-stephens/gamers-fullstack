import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import {
  createGame, getGameTypes, updateGame,
} from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  skillLevel: '',
  numberOfPlayers: '',
  title: '',
  maker: '',
  gameType: '',
};

const GameForm = ({ obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        gameType: obj.game_type?.id,
        maker: obj.maker,
        title: obj.title,
        numberOfPlayers: obj.number_of_players,
        skillLevel: obj.skill_level,
        userId: user.uid,
      });
    }
  }, [obj, user]);

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
    if (obj.id) {
      const gameUpdate = {
        id: obj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      updateGame(gameUpdate).then(() => router.push('/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };

      // Send POST request to your API
      createGame(game).then(() => router.push('/games'));
    }
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
            name="gameType"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameType}
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
  obj: PropTypes.shape({
    skill_level: PropTypes.number,
    number_of_players: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    game_type: PropTypes.shape({
      id: PropTypes.number,
    }),
    id: PropTypes.number,
  }).isRequired,
};

export default GameForm;
