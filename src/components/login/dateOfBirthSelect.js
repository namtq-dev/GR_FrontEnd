import { useMediaQuery } from 'react-responsive';

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateError,
}) {
  const largeScreenView = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  return (
    <div
      className="reg_grid"
      style={{
        marginBottom: `${dateError && !largeScreenView ? '90px' : '0'}`,
      }}
    >
      <select name="bDay" value={bDay} onChange={handleRegisterChange}>
        {days.map((day, index) => (
          <option value={day} key={index}>
            {day}
          </option>
        ))}
      </select>
      <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
        {months.map((month, index) => (
          <option value={month} key={index}>
            {month}
          </option>
        ))}
      </select>
      <select name="bYear" value={bYear} onChange={handleRegisterChange}>
        {years.map((year, index) => (
          <option value={year} key={index}>
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !largeScreenView
              ? 'input_error'
              : 'input_error input_error_select_large'
          }
        >
          <div
            className={
              !largeScreenView ? 'error_arrow_bottom' : 'error_arrow_left'
            }
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
