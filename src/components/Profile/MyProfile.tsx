import React, { useState, FC } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';
import IUser from '../../interfaces/IUser';

import wahineImg from '../../../img/wahine.svg';

type Props = IUser;

const MyProfile: FC<Props> = ({
  firstname,
  lastname,
  city,
  favorite_spot,
  wahine,
  department,
  surf_style,
  surf_skill,
  desc,
}) => {
  const [editProfil, setEditProfil] = useState<boolean>(false);
  const [editSkills, setEditSkills] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<FileList | null | undefined>();
  const [revokeUrl, setRevokeUrl] = useState<boolean>(false);

  const previewProfilImage = () => {
    let imageUrl: string = '';

    if (revokeUrl) {
      URL.revokeObjectURL(imageUrl);
      imageUrl = '';
      setRevokeUrl(false);
    }
    if (previewImage) {
      imageUrl = URL.createObjectURL(previewImage[0]);
      return imageUrl;
    }
    return imageUrl;
  };

  return (
    <div className="myProfile">
      <div className="myProfile__row">
        <p>{wahine ? 'Wahine' : 'Hiki'}</p>
        {editSkills ? (
          <BsPencilSquare size="2rem" color="black" />
        ) : !editProfil ? (
          <BsPencilSquare size="2rem" color="black" onClick={() => setEditProfil(true)} />
        ) : (
          <BsPencilSquare size="2rem" color="#fedb9b" />
        )}
      </div>

      <div className="myProfile__column">
        {!editProfil ? (
          <div className="myProfile__column__column1">
            <img src={wahineImg} alt="hiki" />
            <div className="myProfile__column__column1__info">
              <h2>
                {lastname} {firstname}
              </h2>
              <h6>{city}</h6>
              <h6>{favorite_spot}</h6>
            </div>
          </div>
        ) : (
          <div className="myProfile__column__column1">
            <form className="myProfile__column__column1__form" action="/" method="POST">
              {!previewImage ? (
                <FiUpload size="10rem" color="#fedb9b" />
              ) : (
                <img
                  className="myProfile__column__column1__form__previewImage"
                  src={previewProfilImage()}
                  alt=""
                />
              )}
              <label
                htmlFor="file-upload"
                className="myProfile__column__column1__form__label">
                Téléverser
              </label>
              <input
                className="myProfile__column__column1__form__input"
                id="file-upload"
                type="file"
                name="sampleFile"
                accept="image/*"
                onChange={(e) => {
                  setPreviewImage(e.target.files);
                  setRevokeUrl(true);
                }}
              />
            </form>
            <form className="myProfile__column__column1__info">
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Nom Prénom"
                type="text"
                id="name"
                name="name"
                required
              />
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Ville"
                type="text"
                id="city"
                name="city"
                required
              />
              <input
                className="myProfile__column__column1__info__input"
                placeholder="Spot préféré"
                type="text"
                id="spot"
                name="spot"
                required
              />
            </form>
          </div>
        )}

        <div className="myProfile__column__column2">
          <div className="myProfile__column__column2__row1">
            <div>
              <p>
                {department} {/*Should be regions*/}
              </p>
              <p>{surf_style}</p>
            </div>
            {editProfil ? (
              <BsPencilSquare color="grey" />
            ) : !editSkills ? (
              <BsPencilSquare color="grey" onClick={() => setEditSkills(true)} />
            ) : (
              <BsPencilSquare color="#fedb9b" />
            )}
          </div>
          <div className="myProfile__column__column2__row2">
            <h2>Skills</h2>
            <div className="myProfile__column__column2__row2__wrap">
              <p>{surf_skill}</p>
            </div>
          </div>
          <div className="myProfile__column__column2__row3">
            {!editProfil ? (
              <div className="myProfile__column__column2__row3__describe">
                <h2>3 mots pour me décrire</h2>
                <h6>{desc}</h6>
              </div>
            ) : (
              <div className="myProfile__column__column2__row3__describe">
                <h2>3 mots pour me décrire</h2>
                <input
                  className="myProfile__column__column2__row3__describe__input"
                  placeholder="Ma description"
                  type="text"
                  id="description"
                  name="description"
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {editProfil || editSkills ? (
        <button
          className="myProfile__button"
          onClick={() => {
            editProfil ? setEditProfil(false) : setEditSkills(false);
          }}>
          Enregistrer
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default MyProfile;
