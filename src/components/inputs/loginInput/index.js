import './style.css';
import { ErrorMessage, useField } from 'formik';

export default function LoginInput({ bottom, ...params }) {
  const [field, meta] = useField(params);
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div className="input_error" style={{ transform: 'translateY(3px)' }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_top"></div>
        </div>
      )}

      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        {...field}
        {...params}
      />

      {meta.touched && meta.error && bottom && (
        <div className="input_error" style={{ transform: 'translateY(2px)' }}>
          <ErrorMessage name={field.name} />
          <div className="error_arrow_bottom"></div>
        </div>
      )}

      {meta.touched && meta.error && (
        <i className="error_icon" style={{ top: `${!bottom && '63%'}` }}></i>
      )}
    </div>
  );
}
