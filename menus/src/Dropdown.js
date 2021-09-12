export const Dropdown = ({
  options,
  id,
  onSelectedValueChage,
  selectedValue,
}) => {
  return (
    <select
      name="pets"
      id={id}
      onChange={(e) => onSelectedValueChage(e.target.value)}
    >
      {options.map(({ value, label }) => (
        <option selected={value === selectedValue} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
