import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EventForm from '../../../components/event/EventForm';
import { getSingleEvent } from '../../../utils/data/eventData';

export default function EditEvent() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [id]);

  return (
    <EventForm obj={editEvent} />
  );
}
