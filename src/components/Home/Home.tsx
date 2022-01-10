import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import IRegion from '../../interfaces/IRegion';
import ISession from '../../interfaces/ISession';
import IUser from '../../interfaces/IUser';
import NextSession from '../NextSession';
import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import Region from './Region';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Home: FC<Props> = ({ setActiveModal }) => {
  const [regions, setRegions] = useState<IRegion[]>([]);
  const [threeSessions, setThreeSessions] = useState<ISession[]>([]);

  const first: number = 0;
  const second: number = 5;

  const [allWahine, setAllWahine] = useState<IUser[]>([]);

  useEffect(() => {
    axios
      .get<IRegion[]>('http://lfpll-back.herokuapp.com/api/regions')
      .then((result) => result.data)
      .then((data) => setRegions(data));
  }, []);

  useEffect(() => {
    axios
      .get<ISession[]>('http://localhost:3000/api/sessions/?limit=3')
      .then((result) => result.data)
      .then((data) => setThreeSessions(data));
  }, []);

  useEffect(() => {
    axios
      .get<IUser[]>('http://localhost:3000/api/users')
      .then((result) => result.data)
      .then((data) => setAllWahine(data));
  }, []);
  console.log(allWahine);
  return (
    <div className="home">
      {/*Section : Présentation*/}

      <div className="home__presentation">
        <h1 className="home__presentation__h1">
          {' '}
          Trouve des filles avec qui surfer <br />
          Des sessions entre surfeuses partout en France
        </h1>

        <h4 className="home__presentation__h4">
          Pour tous les niveaux et organisés par des filles du coin qui maitrisent leur
          spot
        </h4>
      </div>
      {/*Section : Les sessions de ta région*/}
      <div className="home__region">
        <h3 className="home__region__h3">Les sessions de ta région</h3>
        <div className="home__region__component">
          {regions &&
            regions.map((region) => {
              return <Region {...region} key={region.id_region} />;
            })}
        </div>
      </div>

      {/*Section : Les prochaines sessions*/}
      <div className="home__sessions">
        <h3 className="home__sessions__h3">Les prochaines sessions</h3>
        <div className="home__sessions__component">
          {threeSessions &&
            threeSessions.map((session) => {
              return <NextSession {...session} key={session.id_session} />;
            })}
        </div>
        <NavLink to="/sessions" className="home__sessions__h5">
          Toutes les sessions <BsBoxArrowInUpRight />
        </NavLink>
      </div>

      {/* Section : Nos wahines */}
      <div className="home__wahines">
        <h3 className="home__wahines__h3">Nos Wahines</h3>
        <div className="home__wahines__component">
          {allWahine &&
            allWahine
              .filter((aWahine) => aWahine.wahine)
              .slice(first, second)
              .map((oneWahine) => {
                return (
                  <Wahine
                    {...oneWahine}
                    setActiveModal={setActiveModal}
                    key={oneWahine.id_user}
                  />
                );
              })}
        </div>
        <h5 className="home__wahines__link">
          Toutes les wahines <BsBoxArrowInUpRight />
        </h5>
      </div>

      {/* Section : Devenir wahine */}
      <BecomeWahine />
    </div>
  );
};

export default Home;
