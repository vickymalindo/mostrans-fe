import { Link } from 'react-router-dom';
import { ListCharacter } from '../types/character';
import { dateFormater } from '../utils/date';

const Card = ({ id, name, species, gender, image, created }: ListCharacter) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Link to={`/detail-character/${id}`}>
          <img
            alt="Placeholder"
            className="block h-auto w-full transition-all border-e-slate-300   hover:scale-105"
            src={image}
          />
        </Link>

        <div className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg font-bold">{name}</h1>
          <p className="text-grey-darker text-sm">{dateFormater(created)}</p>
        </div>

        <div className="flex items-center justify-between leading-none p-2 md:p-4">
          <p>{species}</p>
          <p>{gender}</p>
        </div>
      </article>
    </div>
  );
};

export default Card;
