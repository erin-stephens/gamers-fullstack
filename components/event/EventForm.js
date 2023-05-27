import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

const EventForm = ({ user }) => {
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      game: currentEvent.gameId,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
    };

    // Send POST request to your API
    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Game"
              name="gameId"
              onChange={handleChange}
              className="mb-3"
              required
            >
              <option value="">Select a Game</option>
              {
                games.map((game) => (
                  <option
                    key={game.id}
                    value={game.id}
                  >
                    {game.title}
                  </option>
                ))
              }
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput1" label="Date" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Select Event Date"
              name="date"
              value={currentEvent.date}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput2" label="Time" className="mb-3">
            <Form.Control
              type="time"
              placeholder="Select Event Time"
              name="time"
              value={currentEvent.time}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              type="desciption"
              placeholder="Write descrition here"
              name="description"
              value={currentEvent.description}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
