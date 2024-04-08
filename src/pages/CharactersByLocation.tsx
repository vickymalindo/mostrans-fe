import React from 'react';
import Header from '../components/Header';
import Select from 'react-select';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { ListCharacter } from '../types/character';

const CharactersByLocation = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [data, setData] = React.useState([]);
  const dataString: any = localStorage.getItem('characterLocation');
  const locationString: any = localStorage.getItem('location');
  const [loading, setLoading] = React.useState(false);
  const location = JSON.parse(locationString);
  const characterLocation = JSON.parse(dataString);

  React.useEffect(() => {
    setLoading((prev) => (prev = true));
    setTimeout(() => {
      if (selectedOption === null) {
        setLoading((prev) => (prev = false));
        return;
      }
      const idx = location.findIndex(
        (val: any) => val.value === selectedOption
      );
      const isEmptyCharacterByLocation = Object.entries(characterLocation[idx]);
      if (isEmptyCharacterByLocation.length === 0) {
        setData([]);
        setLoading((prev) => (prev = false));
        return;
      }
      const tempData = characterLocation[idx].selectedOption;
      setData(tempData);
      setLoading((prev) => (prev = false));
    }, 1000);
  }, [selectedOption]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />

      <h1 className="font-bold text-2xl sm:text-[30px] px-4 mb-4 mt-3">
        List Character By Location
      </h1>

      <div className="w-full flex justify-end h-max px-4">
        <Select
          className="mb-4 w-full block"
          defaultValue={selectedOption}
          onChange={(e: any) => setSelectedOption(e.value)}
          options={location}
        />
      </div>

      <p className="px-4 font-semibold">
        You are choose Location : {selectedOption}
      </p>

      <section className="px-4 flex flex-wrap mb-2">
        {data.length !== 0 &&
          data.map((val: ListCharacter) => {
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
      </section>
      {selectedOption === null ? (
        <p className="text-center text-[24px] font-bold mt-4">
          Please, select a location
        </p>
      ) : data.length === 0 ? (
        <p className="text-center text-[24px] font-bold mt-4">
          The location has no content
        </p>
      ) : null}
    </>
  );
};

export default CharactersByLocation;
