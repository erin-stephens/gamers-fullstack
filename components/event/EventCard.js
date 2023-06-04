import PropTypes from 'prop-types';
import React from 'react';
import { Card, Dropdown, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function EventCard({
  game,
  description,
  date,
  time,
  organizer,
  id,
  onUpdate,
  joined,
}) {
  const { user } = useAuth();
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${date}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const join = () => {
    joinEvent(id, user.uid).then(() => onUpdate());
  };
  const leave = () => {
    leaveEvent(id, user.uid).then(() => onUpdate());
  };
  return (
    <Card className="text-center">
      <Card.Header>{game.title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {organizer.bio}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{date}</Card.Text>
        <Card.Text>{time}</Card.Text>
        <Dropdown>
          <Dropdown.Toggle className="dropdownBtn">
            Options
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href={`/events/${id}`}>View</Dropdown.Item>
            <Dropdown.Item href={`/events/edit/${id}`}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={deleteThisEvent}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {joined ? <Button onClick={leave}>Leave</Button> : <Button onClick={join}>Join</Button>}
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    bio: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
