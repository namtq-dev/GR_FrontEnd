import { ErrorMessage, useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
import './style.css';

export default function RegisterInput({ bottom, ...params }) {
  const [field, meta] = useField(params);

  const mobileView = useMediaQuery({
    query: '(min-width: 539px)',
  });
  const largeScreenView = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  const checkView1 = largeScreenView && field.name === 'firstName';
  const checkView2 = largeScreenView && field.name === 'lastName';

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        style={{
          width: `${
            mobileView &&
            (field.name === 'firstName' || field.name === 'lastName')
              ? '100%'
              : mobileView &&
                (field.name === 'email' || field.name === 'password')
              ? '370px'
              : '300px'
          }`,
        }}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        {...field}
        {...params}
      />

      {meta.touched && meta.error && (
        <div
          className={
            largeScreenView ? 'input_error input_error_desktop' : 'input_error'
          }
          style={{
            transform: 'translateY(2px)',
            left: `${checkView1 ? '-107%' : checkView2 ? '107%' : ''}`,
          }}
        >
          <ErrorMessage name={field.name} />
          <div
            className={
              largeScreenView && field.name !== 'lastName'
                ? 'error_arrow_left'
                : checkView2
                ? 'error_arrow_right'
                : !largeScreenView && 'error_arrow_bottom'
            }
          ></div>
        </div>
      )}

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
