export const Dropdown = ({
  options,
  id,
  onSelectedValueChange,
  selectedValue,
}) => {
  return (
    <select
      name="pets"
      id={id}
      onChange={(e) => onSelectedValueChange(e.target.value)}
    >
      {options.map(({ value, label }) => (
        <option key={value} selected={value === selectedValue} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
