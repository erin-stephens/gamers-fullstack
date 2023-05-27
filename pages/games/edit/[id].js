/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../../utils/data/gameData';
import GameForm from '../../../components/game/GameForm';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then((obj) => {
      obj.numberOfPlayers = obj.number_of_players;
      obj.skillLevel = obj.skill_level;
      obj.gameTypeId = obj.game_type.id;
      setEditGame(obj);
    });
  }, [id]);

  return (
    <GameForm obj={editGame} />
  );
}
