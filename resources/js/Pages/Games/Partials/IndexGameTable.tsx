import React, { useState } from 'react';

import { ShowGamesProps } from '@/types';
import formatTime from '@/Services/formatTime';
import formatDate from '@/Services/formatDate';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card
} from '@/Components/ui';
import GameCardList from './Gamecard';


export default function IndexGameTable({
  games,
  sports,
  playgrounds,
  teams,
}: ShowGamesProps) {
  
   {/* SET FILTER VARIABLES */}
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedSport, setSelectedSport] = useState<string>("");


    {/* FILTERED GAMES BY SPORTS OR POSTCODE*/}
    const filteredGames = games.filter(game => {
        const playground = playgrounds.find(playground => playground.id === game.playground_id);
        const sport = sports.find(sport => sport.id === game.sport_id);
        return (
            (searchTerm === "" || (playground && playground.postcode.includes(searchTerm))) &&
            (selectedSport === "" || (sport && sport.name.toLowerCase() === selectedSport.toLowerCase()))
        );
    });
  
  return (
    <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
      <h2 className="text-sky-500 text-2xl ml-2 mb-5">Matchs</h2>
     <div className="flex justify-start">

                    {/* REDIRECTION BUTTON TO CREATE A GAME */}
                    <PrimaryButton className='opacity-80 mb-2 bg-sky-500'>
                        <Link href="games/create/">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="top-0 right-0 w-5 h-5">
                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </PrimaryButton>

                    {/* DROPDOWN TO FILTER BY SPORTS */}
                    <select
                        id="sports"
                        className="mt-1 block mb-2 ml-2 w-48 py-2 rounded-md"
                        value={selectedSport}
                        onChange={e => setSelectedSport(e.target.value)}
                    >
                        <option value="">All Sports</option>
                        {sports.map(sport => (
                            <option key={sport.id} value={sport.name}>
                                {sport.name}
                            </option>
                        ))}
                    </select>


                    {/* INPUT TO FILTER BY POSTCODE */}
                    <TextInput
                        id="postcode"
                        type="text"
                        className="mt-1 block mb-2 ml-2 w-48 py-2"
                        placeholder="Search by postcode..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>

      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sport</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>From / To</TableHead>
              <TableHead>Playground</TableHead>
              <TableHead>Adress</TableHead>
              <TableHead>Max Player</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredGames.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>PAS DE MATCHS CRÉÉS</TableCell>
              </TableRow>
            ) : (
              filteredGames.map(game => {
                const sport = sports.find(sport => sport.id === game.sport_id);
                const playground = playgrounds.find(
                  playground => playground.equipment_id === game.equipment_id,
                );

                return (
                  <TableRow key={game.id}>
                    <TableHead>{sport?.name}</TableHead>
                    <TableCell>{formatDate(game.date)}</TableCell>
                    <TableCell>
                      {formatTime(game.start_time)} /{' '}
                      {formatTime(game.end_time)}
                    </TableCell>
                    <TableCell>{playground?.name}</TableCell>
                    <TableCell>
                      {playground?.adress}, {playground?.postcode}{' '}
                      {playground?.city}
                    </TableCell>
                    <TableCell>{game.teams.reduce((totalPlayers, team) => totalPlayers + team.users.length, 0) + 1} / {game.max_player}</TableCell>
                    <TableCell>
                      <Link
                        href={`games/${game.id}`}
                        className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                      >
                        Show Details
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <div className="block sm:hidden">
        {games.map(game => {
          const sport = sports.find(sport => sport.id === game.sport_id);
          const playground = playgrounds.find(
            playground => playground.equipment_id === game.equipment_id,
          );

          return (
            <Card key={game.id} className="my-4">
              <div className="p-4">
                <div className='flex justify-between'>
                  <span className='font-bold'>{sport?.name} </span>
              <span>{formatDate(game.date)} </span>  </div>
                <div className='mt-1 flex justify-center font-bold'>
                  {playground?.name}
                </div>
                <div className='mt-1 flex justify-center'>
             
                  {playground?.adress}, {playground?.postcode}{' '}
                  {playground?.city}
                </div>
                <div className='mt-1 flex justify-center'>
               <span className='font-bold mr-1'>From / To:</span> 
                  {formatTime(game.start_time)} / {formatTime(game.end_time)}
                </div>
                <div className='mt-1 flex justify-center'>
                {game.teams.reduce((totalPlayers, team) => totalPlayers + team.users.length, 0) + 1} / {game.max_player}
                </div>
                <div>
                  <Link
                    href={`games/${game.id}`}
                    className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                  >
                    Show Details
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
