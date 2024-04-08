import { IntersectionCharacter } from '../types/character';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER } from '../query/character';
import Header from '../components/Header';
import { FaChevronLeft, FaLocationArrow } from 'react-icons/fa';
import { IoMdCheckmark, IoMdClose, IoMdFemale } from 'react-icons/io';
import { GiAnimalSkull } from 'react-icons/gi';
import { MdOutlinePersonOff, MdOutlinePersonOutline } from 'react-icons/md';
import { FaEarthAsia } from 'react-icons/fa6';
import { dateFormater } from '../utils/date';
import Loader from '../components/Loader';
import Select from 'react-select';
import React from 'react';

const Character = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [locName, setLocName] = React.useState<string>('');
  const dataString: any = localStorage.getItem('characterLocation');
  const locationString: any = localStorage.getItem('location');
  const [location, setLocation] = React.useState(JSON.parse(locationString));
  const [characterLocation, setCharacterLocation] = React.useState(
    JSON.parse(dataString)
  );
  const { id: idCharacter } = useParams();
  const { loading, error, data } = useQuery<IntersectionCharacter | any>(
    GET_CHARACTER,
    {
      variables: { id: idCharacter },
    }
  );

  if (error) alert(error);
  if (loading) {
    return <Loader />;
  }

  const createLocation = () => {
    const obj: any = {};
    let tempCharLocation: any = [];
    let arrLocation = [];
    if (!location) {
      (obj.value = locName), (obj.label = locName);
      arrLocation = [obj];
      tempCharLocation = [{}];
      localStorage.setItem('location', JSON.stringify(arrLocation));
      localStorage.setItem(
        'characterLocation',
        JSON.stringify(tempCharLocation)
      );
      setLocation(arrLocation);
      setCharacterLocation(tempCharLocation);
      setLocName('');
      alert('location success created');
      return;
    }

    const search = location.findIndex((val: any) => val.value === locName);
    if (search >= 0) {
      alert('location already created');
      return;
    }
    (obj.value = locName), (obj.label = locName);
    arrLocation = [...location, obj];
    tempCharLocation = [...characterLocation, {}];
    localStorage.setItem('location', JSON.stringify(arrLocation));
    localStorage.setItem('characterLocation', JSON.stringify(tempCharLocation));
    setLocation(arrLocation);
    setCharacterLocation(tempCharLocation);
    setLocName('');
    alert('location success created');
  };

  const assignCharacter = () => {
    if (selectedOption === null) {
      alert('you must select the location');
      return;
    }
    const objData: any = {};
    let tempChar = characterLocation;

    for (let i = 0; i < tempChar.length; i++) {
      if (Object.entries(tempChar[i]).length !== 0) {
        const removeCharacter = tempChar[i].selectedOption.filter(
          (val: any) => val.id !== idCharacter
        );
        tempChar.splice(i, 1, { selectedOption: removeCharacter });
        localStorage.setItem('characterLocation', JSON.stringify(tempChar));
        setCharacterLocation(tempChar);
      }
    }

    const idx = location.findIndex((val: any) => val.value === selectedOption);

    objData.name = data?.character.name;
    objData.id = data?.character.id;
    objData.image = data?.character.image;
    objData.species = data?.character.species;
    objData.gender = data?.character.gender;
    objData.created = data?.character.created;

    if (Object.entries(characterLocation[idx]).length === 0) {
      tempChar.splice(idx, 1, { selectedOption: [objData] });
      localStorage.setItem('characterLocation', JSON.stringify(tempChar));
      setCharacterLocation(tempChar);
    } else {
      let tempData: any = [];
      tempData = [...tempChar[idx].selectedOption, objData];
      tempChar.splice(idx, 1, { selectedOption: tempData });
      localStorage.setItem('characterLocation', JSON.stringify(tempChar));
      setCharacterLocation(tempChar);
    }
  };

  return (
    <section>
      <Header />

      <h1 className="text-[30px] px-4 font-bold mt-3">Detail Character</h1>

      <section className="px-4 flex items-center gap-3 mt-3 text-xl">
        <FaChevronLeft />
        <Link to="/">Back to Characters</Link>
      </section>

      <section className="flex justify-start px-4 py-2 flex-col md:flex-row gap-6">
        <aside className="h-max">
          <img
            src={data?.character.image}
            alt={`image_${name}`}
            className="h-full md:h-[570px] w-full  md:w-[700px] block"
          />
        </aside>
        <article className="text-start w-full md:w-[690px]">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-[30px] mb-3">
              {data.character.name}
            </h1>
            <p className="font-semibold text-lg">
              {dateFormater(data.character.created)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xl mb-2">
            <FaLocationArrow className="inline-block text-red-600" />
            <span className="inline-block text-red-500">
              {data?.character.location.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xl mb-2">
            <IoMdFemale className="text-pink-400 inline-block" />
            <span className="text-pink-300 inline-block">
              {data?.character.gender}
            </span>
          </div>
          {data?.character.type !== '' && (
            <div className="flex items-center gap-2 text-xl mb-2">
              <GiAnimalSkull className="text-green-600 inline-block" />
              <span className="text-green-300 inline-block">
                {data?.character.type}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xl mb-2">
            {data?.character.species === 'Human' ? (
              <MdOutlinePersonOutline className="text-blue-400 inline-block" />
            ) : (
              <MdOutlinePersonOff className="text-blue-400 inline-block" />
            )}
            <span className="text-blue-600">{data?.character.species}</span>
          </div>
          <div className="flex items-center gap-2 text-xl mb-2">
            {data?.character.status === 'Dead' ||
            data?.character.status === 'unknown' ? (
              <IoMdClose className="text-orange-40 inline-block" />
            ) : (
              <IoMdCheckmark className="text-orange-400 inline-block" />
            )}
            <span className="text-orange-600 inline-block   ">
              {data?.character.status}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xl mb-2">
            <FaEarthAsia className="text-yellow-400 inline-block" />
            <span className="text-yellow-300 inline-block">
              {data?.character.origin.name}
            </span>
          </div>
          <div className="h-[2px] w-full bg-gray-300 my-4"></div>
          <div>
            <div className="mb-4">
              <input
                type="text"
                onChange={(e) => setLocName(e.target.value)}
                value={locName}
                placeholder="insert location"
                className="inline-block border-[2px] border-black rounded-sm outline-none py-2 px-3 w-full mb-2"
              />

              <button
                className="bg-black rounded-md text-lg px-3 py-2 text-white w-full"
                onClick={createLocation}
              >
                Create Location
              </button>
            </div>
            {location !== null && (
              <div>
                <Select
                  className="mb-4"
                  defaultValue={selectedOption}
                  onChange={(e: any) => setSelectedOption(e.value)}
                  options={location}
                />
                <button
                  className="bg-black rounded-md text-lg px-3 py-2 text-white w-full"
                  onClick={assignCharacter}
                >
                  Assign
                </button>
              </div>
            )}
          </div>
        </article>
      </section>
    </section>
  );
};

export default Character;
