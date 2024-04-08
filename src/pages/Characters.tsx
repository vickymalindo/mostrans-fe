import Header from '../components/Header';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../query/character';
import Card from '../components/Card';
import { ListCharacter } from '../types/character';
import Loader from '../components/Loader';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import React from 'react';

const Characters = () => {
  const [page, setPage] = React.useState(1);
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: page },
  });

  if (error) alert(error);
  if (loading) {
    return <Loader />;
  }

  const nextPageFun = () => {
    setPage((prev) => prev + 1);
  };

  const prevPageFun = () => {
    setPage((prev) => (prev - 1 === 0 ? 1 : prev - 1));
  };

  return (
    <>
      <Header />

      <h1 className="font-bold text-[30px] px-4 mt-3">List Character</h1>

      <div className="flex justify-end items-center px-3 my-3 gap-3">
        <button
          disabled={page < 2 ? true : false}
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={prevPageFun}
        >
          <FaChevronLeft />
        </button>
        <span className="inline-block">{page}</span>
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={nextPageFun}
        >
          <FaChevronRight />
        </button>
      </div>
      {data?.characters.results.length === 0 && <p>no data</p>}
      <div className="flex flex-wrap px-2 mb-2">
        {data &&
          data.characters.results.map((val: ListCharacter) => {
            return (
              <Card
                key={val.id}
                id={val.id}
                name={val.name}
                species={val.species}
                gender={val.gender}
                image={val.image}
                created={val.created}
              />
            );
          })}
      </div>
    </>
  );
};

export default Characters;
