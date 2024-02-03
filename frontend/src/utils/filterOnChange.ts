export const handleChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const targetValue = event.target.value;
  setState(
    (prevStars) =>
      event.target.checked
        ? [...prevStars, targetValue] //adding
        : prevStars?.filter((filterValue) => filterValue !== targetValue) //removing
  );
};
