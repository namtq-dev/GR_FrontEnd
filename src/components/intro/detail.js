import { useState } from 'react';
import UpdateBio from './updateBio';

export default function Detail({
  value,
  img,
  placeholder,
  name,
  handleChange,
  updateDetails,
  infos,
  text,
  relationship,
}) {
  const [showUpdateDetail, setShowUpdateDetail] = useState(false);

  return (
    <div>
      <div
        className="add_details_flex"
        onClick={() => setShowUpdateDetail(true)}
      >
        {value ? (
          <div className="info_profile">
            <img src={`../../../icons/${img}.png`} alt="" />
            {value}
            <i className="edit_icon"></i>
          </div>
        ) : (
          <>
            <i className="rounded_plus_icon"></i>
            <span className="underline">Add {text}</span>
          </>
        )}
      </div>
      {showUpdateDetail && (
        <UpdateBio
          placeholder={placeholder}
          name={name}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          detail
          setShowUpdateDetail={setShowUpdateDetail}
          relationship={relationship}
        />
      )}
    </div>
  );
}
