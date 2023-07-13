export default function UpdateBio({
  infos,
  handleBioChange,
  charactersLeft,
  setShowBioUpdate,
}) {
  return (
    <div className="add_bio_wrap">
      <textarea
        placeholder="Add Bio"
        name="bio"
        value={infos?.bio}
        maxLength={100}
        className="textarea_blue details_input"
        onChange={handleBioChange}
      ></textarea>
      <div className="remaining">{charactersLeft} characters remain</div>
      <div className="flex">
        <div className="flex flex_left">
          <i className="public_icon"></i>Public
        </div>
        <div className="flex flex_right">
          <button className="gray_btn" onClick={() => setShowBioUpdate(false)}>
            Cancel
          </button>
          <button className="blue_btn">Save</button>
        </div>
      </div>
    </div>
  );
}
