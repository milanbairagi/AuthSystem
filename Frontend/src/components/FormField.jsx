const FormField = ({id, label, type, value, onChange}) => (
  <div>
    <label htmlFor={`${id}`}>{label}:</label>
    <input
      id={id}
      className="border border-gray-800 px-2 py-1 ml-2 rounded"
      type={type}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default FormField;