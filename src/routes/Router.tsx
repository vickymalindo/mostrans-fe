import { createBrowserRouter } from 'react-router-dom';
import Characters from '../pages/Characters';
import Character from '../pages/Character';
import CharactersByLocation from '../pages/CharactersByLocation';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Characters />,
  },
  {
    path: 'detail-character/:id',
    element: <Character />,
  },
  {
    path: 'character-by-location',
    element: <CharactersByLocation />,
  },
]);
