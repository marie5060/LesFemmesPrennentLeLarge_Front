import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsBoxArrowInUpRight } from 'react-icons/bs';

import NextSession from '../NextSession';
import Wahine from '../Wahine';
import BecomeWahine from './BecomeWahine';
import Region from './Region';

const Home = () => {
  interface regionTypes {
    id_region: number;
    name: string;
    color: string;
  }

  const [regions, setRegions] = useState<regionTypes[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/regions')
      .then((result: any) => result.data)
      .then((data: any) => setRegions(data));
  }, []);

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
          Pour tous les niveaux et organisés par des filles de coin qui maitrisent leur
          spot
        </h4>
      </div>
      {/*Section : Les sessions de ta région*/}
      <div className="home__region">
        <h3 className="home__region__h3">Les sessions de ta région</h3>
        <div className="home__region__component">
          {regions &&
            regions.map((region) => {
              return (
                <Region name={region.name} color={region.color} key={region.id_region} />
              );
            })}
        </div>
      </div>

      {/*Section : Les prochaines sessions*/}
      <div className="home__sessions">
        <h3 className="home__sessions__h3">Les prochaines sessions</h3>
        <div className="home__sessions__component">
          <NextSession />
          <NextSession />
          <NextSession />
        </div>
        <h5 className="home__sessions__h5">
          Toutes les sessions <BsBoxArrowInUpRight />
        </h5>
      </div>
      {/* Section : Nos wahines */}
      <div className="home__wahines">
        <h3 className="home__wahines__h3">Nos Wahines</h3>
        <div className="home__wahines__component">
          <Wahine />
          <Wahine />
          <Wahine />
          <Wahine />
          <Wahine />
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
