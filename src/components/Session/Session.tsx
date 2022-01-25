import axios from 'axios';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { useLayoutEffect } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { useParams } from 'react-router';

import IDepartment from '../../interfaces/IDepartment';
import ISession from '../../interfaces/ISession';
import ISurfStyle from '../../interfaces/ISurfStyle';
import IUser from '../../interfaces/IUser';
import IWeather from '../../interfaces/IWeather';
import CurrentUserContext from '../contexts/CurrentUser';
import Hiki from '../Hiki';
import Wahine2 from '../Wahine2';

type Props = {
  setActiveModal: Dispatch<SetStateAction<string>>;
};

const Session: FC<Props> = ({ setActiveModal }) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  const { id } = useContext(CurrentUserContext);
  let { id_session } = useParams();

  const [session, setSession] = useState<ISession>();
  const [subscribers, setSubscribers] = useState<IUser[]>([]);
  const [weather, setWeather] = useState<IWeather[]>([]);
  const [department, setDepartment] = useState<IDepartment>();
  const [surfStyle, setSurfStyle] = useState<ISurfStyle>();
  const [wahine, setWahine] = useState<IUser>();
  const [wantSubscribe, setWantSubscribe] = useState<boolean>(false);

  console.log(id);

  useEffect(() => {
    axios
      .get<ISession>(`http://localhost:3000/api/sessions/${id_session}`)
      .then((result) => result.data)
      .then((data) => {
        setSession(data);
        console.log(data);
        axios
          .get<IUser>(`http://localhost:3000/api/users/${data.id_user}`)
          .then((result) => result.data)
          .then((data) => setWahine(data));
        axios
          .get<IDepartment>(`http://localhost:3000/api/departments/${data.id_department}`)
          .then((result) => result.data)
          .then((data) => setDepartment(data));
        axios
          .get<ISurfStyle>(`http://localhost:3000/api/surfstyle/${data.id_surf_style}`)
          .then((result) => result.data)
          .then((data) => setSurfStyle(data));
      });
    axios
      .get<IUser[]>(`http://localhost:3000/api/sessions/${id_session}/users`)
      .then((result) => result.data)
      .then((data) => setSubscribers(data));
    axios
      .get<IWeather[]>(`http://localhost:3000/api/sessions/${id_session}/weather/`)
      .then((result) => result.data)
      .then((data) => setWeather(data));
  }, []);

  useEffect(() => {
    wantSubscribe &&
      axios
        .post<IUser[]>(`http://localhost:3000/api/sessions/${id_session}/users/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })

        .then((result) => console.log(result.data));

    axios
      .get<IUser[]>(`http://localhost:3000/api/sessions/${id_session}/users`)
      .then((result) => result.data)
      .then((data) => setSubscribers(data));
  }, [wantSubscribe]);

  console.log(wantSubscribe);
  console.log(subscribers);

  return (
    <div className="onesession">
      <div className="session">
        <div className="session__details">
          <div className="session__details__title">
            <h1>{session?.name}</h1>
            <h6 className="session__details__title__region">
              {department?.department_name}
            </h6>
          </div>
          <div className="session__details__infos">
            <h4>
              {session?.nice_date} - {session?.nice_time} - {session?.spot_name}
            </h4>
            <h4 className="session__details__infos__adresse">{session?.address}</h4>
            <div className="session__details__infos__type">
              <h4>Type de session</h4>
              <h6 className="session__details__infos__type__button">
                {surfStyle?.name_session}
              </h6>
            </div>
            <div className="session__details__infos__covoit">
              <h4>
                Co-voiturage <BsFillPatchCheckFill color="#1f8387" />
              </h4>
              <h6 className="session__details__infos__covoit__button">
                {session?.carpool ? 'Oui' : 'Non'}
              </h6>
            </div>
          </div>
          <hr className="session__details__hr" />
          <div className="session__details__weather">
            <h4>Condition météo</h4>
            <div className="session__details__weather__buttons">
              {weather.map((weather, index) => {
                return (
                  <h6 key={index} className="session__details__weather__buttons__button1">
                    {weather.name}
                  </h6>
                );
              })}
            </div>
          </div>
        </div>
        <div className="session__organiser">
          <h4>Organisé par:</h4>
          {wahine && (
            <Wahine2 {...wahine} setActiveModal={setActiveModal} key={wahine.id_user} />
          )}
        </div>
      </div>
      <button
        className="onesession__join"
        onClick={() => {
          if (id > 0) {
            setActiveModal('registered');
            setWantSubscribe(true);
          } else {
            setActiveModal('connect');
          }
        }}>
        Rejoindre la session
      </button>
      <div className="onesession__group">
        <h3>Hikis de la session</h3>
        <div className="onesession__group__hikis">
          {subscribers &&
            subscribers
              .filter((user) => user.wahine)
              // .slice(first, second)
              .map((user) => {
                return (
                  <Hiki {...user} setActiveModal={setActiveModal} key={user.id_user} />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Session;
