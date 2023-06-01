import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  game: 0,
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

const EventForm = ({ obj }) => {
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    getGames().then(setGames);
    if (obj.id) {
      setCurrentEvent({
        id: obj.id,
        game: obj.game,
        description: obj.description,
        time: obj.time,
        date: obj.date,
      });
    }
  }, [obj, user]);

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
    if (obj.id) {
      const eventUpdate = {
        id: obj.id,
        game: currentEvent.game,
        description: currentEvent.description,
        time: currentEvent.time,
        date: currentEvent.date,
        userId: user.uid,
      };
      updateEvent(eventUpdate).then(() => router.push('/events'));
    } else {
      const event = {
        game: currentEvent.game,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        userId: user.uid,
      };

      // Send POST request to your API
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel controlId="floatingSelect">
            <Form.Select
              aria-label="Game"
              name="game"
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
  obj: PropTypes.shape({
    game: PropTypes.shape({
      id: PropTypes.number,
    }),
    date: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default EventForm;
