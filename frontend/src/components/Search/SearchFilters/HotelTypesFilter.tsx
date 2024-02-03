import {memo} from "react";
import {hotelTypes} from "../../../contants/hotel-options";

type TypesProps = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = memo(({selectedHotelTypes, onChange}: TypesProps) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType) => (
        <label key={hotelType} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
});

export default HotelTypesFilter;
