import Detail from './detail';

export default function EditDetails({
  details,
  handleChange,
  updateDetails,
  infos,
}) {
  console.log(infos);

  return (
    <div className="blur">
      <div className="post_box infos_box">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Edit details</span>
        </div>
        <div className="details_wrapper scrollbar">
          <div className="details_col">
            <span>Customize your infos</span>
            <span>The details you select will be public</span>
          </div>
          <div className="details_header">Other name</div>
          <Detail
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="other name"
          />
          <div className="details_header">Work</div>
          <Detail
            value={details?.job}
            img="job"
            placeholder="Add job title"
            name="job"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="job title"
          />
          <Detail
            value={details?.workplace}
            img="job"
            placeholder="Add workplace"
            name="workplace"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="workplace"
          />
          <div className="details_header">Education</div>
          <Detail
            value={details?.highSchool}
            img="studies"
            placeholder="Add high school"
            name="highSchool"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="high school"
          />
          <Detail
            value={details?.college}
            img="studies"
            placeholder="Add college"
            name="college"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="college"
          />
          <div className="details_header">Address</div>
          <Detail
            value={details?.currentCity}
            img="home"
            placeholder="Add current city"
            name="currentCity"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="current city"
          />
          <div className="details_header">Hometown</div>
          <Detail
            value={details?.hometown}
            img="home"
            placeholder="Add hometown"
            name="hometown"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="hometown"
          />
          <div className="details_header">Relationship</div>
          <Detail
            value={details?.relationship}
            img="relationship"
            placeholder="Add relationship"
            name="relationship"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="relationship"
            relationship
          />
          <div className="details_header">Instagram</div>
          <Detail
            value={details?.instagram}
            img="instagram"
            placeholder="Add instagram"
            name="instagram"
            handleChange={handleChange}
            updateDetails={updateDetails}
            infos={infos}
            text="instagram"
          />
        </div>
      </div>
    </div>
  );
}
