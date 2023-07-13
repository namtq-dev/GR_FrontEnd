import { useState } from 'react';
import './style.css';
import UpdateBio from './updateBio';

export default function Intro({ details, isVisitor }) {
  const initialInfos = {
    bio: details?.bio ? details.bio : 'Wanna know more about me?',
    otherName: details?.otherName ? details.otherName : '',
    job: details?.job ? details.job : 'Doctor',
    workplace: details?.workplace ? details.workplace : 'Google',
    highSchool: details?.highSchool ? details.highSchool : 'PBC High School',
    college: details?.college ? details.college : 'HUST',
    currentCity: details?.currentCity ? details.currentCity : 'Ha Noi',
    hometown: details?.hometown ? details.hometown : 'Ha Tinh',
    relationship: details?.relationship ? details.relationship : 'Single',
    instagram: details?.instagram ? details.instagram : 'kiddos_jk',
  };

  const [infos, setInfos] = useState(initialInfos);
  const [showBioUpdate, setShowBioUpdate] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(
    infos?.bio ? 100 - infos.bio.length : 100
  );

  const handleBioChange = (eve) => {
    setInfos({ ...infos, bio: eve.target.value });
    setCharactersLeft(100 - eve.target.value.length);
  };

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {infos?.bio && !showBioUpdate && (
        <div className="info_col">
          <span className="info_text">{infos.bio}</span>
          {!isVisitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBioUpdate(true)}
            >
              Edit bio
            </button>
          )}
        </div>
      )}
      {showBioUpdate && (
        <UpdateBio
          infos={infos}
          charactersLeft={charactersLeft}
          setShowBioUpdate={setShowBioUpdate}
          handleBioChange={handleBioChange}
        />
      )}
      {infos.job && infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {infos.job} at {infos.workplace}
        </div>
      ) : infos.job && !infos.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {infos.job}
        </div>
      ) : (
        infos.workplace &&
        !infos.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            works at {infos.workplace}
          </div>
        )
      )}
      {infos?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {infos.relationship}
        </div>
      )}
      {infos?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studies at {infos.college}
        </div>
      )}
      {infos?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studies at {infos.highSchool}
        </div>
      )}
      {infos?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          lives in {infos.currentCity}
        </div>
      )}
      {infos?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          from {infos.hometown}
        </div>
      )}
      {infos?.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${infos.instagram}`}
            target="_blank"
          >
            {infos.instagram}
          </a>
        </div>
      )}
      {!isVisitor && (
        <button className="gray_btn hover1 w100">Edit details</button>
      )}
      {!isVisitor && (
        <button className="gray_btn hover1 w100">Add hobbies</button>
      )}
      {!isVisitor && (
        <button className="gray_btn hover1 w100">Add featured</button>
      )}
    </div>
  );
}
