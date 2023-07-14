import { useEffect, useState } from 'react';
import './style.css';
import UpdateBio from './updateBio';
import axios from 'axios';
import { useSelector } from 'react-redux';
import EditDetails from './editDetails';

export default function Intro({ oldDetails, isVisitor }) {
  const [details, setDetails] = useState(oldDetails);
  const initialInfos = {
    bio: details?.bio ? details.bio : '',
    otherName: details?.otherName ? details.otherName : '',
    job: details?.job ? details.job : '',
    workplace: details?.workplace ? details.workplace : '',
    highSchool: details?.highSchool ? details.highSchool : '',
    college: details?.college ? details.college : '',
    currentCity: details?.currentCity ? details.currentCity : '',
    hometown: details?.hometown ? details.hometown : '',
    relationship: details?.relationship ? details.relationship : '',
    instagram: details?.instagram ? details.instagram : '',
  };

  const { user } = useSelector((state) => ({ ...state }));

  const [editDetailsVisible, setEditDetailsVisible] = useState(0);
  const [infos, setInfos] = useState(initialInfos);
  const [showBioUpdate, setShowBioUpdate] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(
    infos?.bio ? 100 - infos.bio.length : 100
  );

  useEffect(() => {
    setDetails(oldDetails);
    setInfos(oldDetails);
  }, [oldDetails]);

  const updateDetails = async () => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/updateDetails`,
        { infos },
        {
          headers: {
            Authorization: `Bearer ${user.loginToken}`,
          },
        }
      );
      setShowBioUpdate(false);
      setDetails(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleChange = (eve) => {
    const { name, value } = eve.target;
    setInfos({ ...infos, [name]: value });
    setCharactersLeft(100 - eve.target.value.length);
  };

  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {details?.bio && !showBioUpdate && (
        <div className="info_col">
          <span className="info_text">{details.bio}</span>
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
      {!details?.bio && !showBioUpdate && !isVisitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setShowBioUpdate(true)}
        >
          Add Bio
        </button>
      )}
      {showBioUpdate && (
        <UpdateBio
          infos={infos}
          charactersLeft={charactersLeft}
          setShowBioUpdate={setShowBioUpdate}
          handleChange={handleChange}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}
      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details.job} at {details.workplace}
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="../../../icons/job.png" alt="" />
          works as {details.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img src="../../../icons/job.png" alt="" />
            works at {details.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="../../../icons/relationship.png" alt="" />
          {details.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studies at {details.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studies at {details.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          lives in {details.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          from {details.hometown}
        </div>
      )}
      {details?.instagram && (
        <div className="info_profile">
          <img src="../../../icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details.instagram}`}
            target="_blank"
          >
            {details.instagram}
          </a>
        </div>
      )}
      {!isVisitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setEditDetailsVisible(1)}
        >
          Edit details
        </button>
      )}
      {!!editDetailsVisible && !isVisitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
        />
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
