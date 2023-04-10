import './style.css';
import { useField } from 'formik';

export default function LoginInput({ ...params }) {
  const [field, meta] = useField(params);
  return (
    <div className="input_wrap">
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        {...field}
        {...params}
      />
    </div>
  );
}
