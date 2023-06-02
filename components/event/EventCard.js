import PropTypes from 'prop-types';
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
  id,
}) => (
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
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Card.Body>
  </Card>
);

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
};

export default EventCard;
