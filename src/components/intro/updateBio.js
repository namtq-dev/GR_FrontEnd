export default function UpdateBio({
  infos,
  handleChange,
  charactersLeft,
  setShowBioUpdate,
  updateDetails,
  placeholder,
  name,
  detail,
  setShowUpdateDetail,
  relationship,
}) {
  return (
    <div className="add_bio_wrap">
      {relationship ? (
        <select
          className="select_rel"
          name={name}
          value={infos?.[name]}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Single">Single</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          maxLength={100}
          className="textarea_blue details_input"
          onChange={handleChange}
        ></textarea>
      )}

      {!detail && (
        <div className="remaining">{charactersLeft} characters remain</div>
      )}
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>Public
        </div>
        <div className="flex flex_right">
          <button
            className="gray_btn"
            onClick={() =>
              !detail ? setShowBioUpdate(false) : setShowUpdateDetail(false)
            }
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updateDetails();
              setShowUpdateDetail(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
