import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

export default function ViewGame() {
  const [game, setGame] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then(setGame);
  }, [id]);

  return (
    <div>View Game
      <h1>title: {game.title}</h1>
      <h3>maker: {game.maker}</h3>
      <h3>Number of Players: {game.number_of_players}</h3>
      <h3>Skill Level: {game.skill_level}</h3>
      <h3>Game Type: {game.label}</h3>
    </div>
  );
}
