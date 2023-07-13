import { useState } from 'react';
import './style.css';

export default function Intro({ details }) {
  const initialInfos = {
    bio: details?.bio ? details.bio : '',
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

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
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
    </div>
  );
}
