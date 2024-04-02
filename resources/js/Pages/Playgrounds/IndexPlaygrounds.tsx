import React from 'react';
import { Link, useForm as inertiaForm } from '@inertiajs/react';
import useRoute from '@/Hooks/useRoute';
import AppLayout from '@/Layouts/AppLayout';
import { Playground } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Card
} from '@/Components/ui';


interface IndexProps {
  playgrounds: Playground[];
  playground?: Playground;
}

export default function IndexPlaygrounds({
  playgrounds,
  playground,
}: IndexProps) {
  const route = useRoute();

  const { delete: destroy, reset } = inertiaForm({
    playground,
  });

  const deletePlayground = (playgroundID: number, e: React.MouseEvent) => {
    e.preventDefault();
    destroy(route('playgrounds.destroy', { id: playgroundID }), {
      preserveScroll: true,
      onFinish: () => reset(),
    });
  };
  return (
    <AppLayout title="Terrains">
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <h2 className="text-sky-500 text-2xl ml-2 mb-5">Playgrounds</h2>

        <div className="block sm:hidden">
          {playgrounds.map(playground => (
            <Card key={playground.id} className="my-4">
              <div className="p-4">
                <div>
                  <span className="font-bold">Nom du terrain:</span>
                  <Link href={`/playgrounds/${playground.id}`}>
                    {playground.name}
                  </Link>
                </div>
                <div>
                  <span className="font-bold">Ville:</span>
                  {playground.city}
                </div>
                <div>
                  <span className="font-bold">Activité:</span>
                  {playground.playground_type}
                </div>
                <div>
                  <Link
                    className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                    href={`/playgrounds/${playground.id}/edit`}
                  >
                    Modifier
                  </Link>
                </div>
                <div>
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={e => deletePlayground(playground.id, e)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="sm:block hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du terrain</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Activite</TableHead>
                <TableHead>Modification</TableHead>
                <TableHead>Suppression</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {playgrounds.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>PAS DE TERRAINS CRÉÉS</TableCell>
                </TableRow>
              ) : (
                playgrounds.map(playground => (
                  <TableRow key={playground.id}>
                    <TableCell>
                      <Link href={`/playgrounds/${playground.id}`}>
                        {playground.name}
                      </Link>
                    </TableCell>
                    <TableCell>{playground.city}</TableCell>
                    <TableCell>{playground.playground_type}</TableCell>
                    <TableCell>
                      <Link
                        className="font-medium text-sky-600 dark:text-sky-500 hover:underline"
                        href={`/playgrounds/${playground.id}/edit`}
                      >
                        Modifier
                      </Link>
                    </TableCell>
                    <TableCell>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={e => deletePlayground(playground.id, e)}
                      >
                        Supprimer
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
