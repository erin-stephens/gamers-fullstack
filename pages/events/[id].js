import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../utils/data/eventData';

export default function ViewEvent() {
  const [event, setEvent] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEvent);
  }, [id]);

  return (
    <div>view event
      <h1>Date: {event.date}</h1>
      <h2>Time: {event.time}</h2>
      {/* <h3>Game: {event.game.title}</h3> */}
      <h3>Description: {event.description}</h3>
    </div>
  );
}
