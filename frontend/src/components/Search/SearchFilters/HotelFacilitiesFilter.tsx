import {memo} from "react";
import {hotelFacilities} from "../../../contants/hotel-options";

type FacilitiesProps = {
  seletedHotelFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const HotelFacilitiesFilter = memo(
  ({seletedHotelFacilities, onChange}: FacilitiesProps) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
        {hotelFacilities.map((facilities) => (
          <label key={facilities} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={facilities}
              checked={seletedHotelFacilities.includes(facilities)}
              onChange={onChange}
            />
            <span>{facilities}</span>
          </label>
        ))}
      </div>
    );
  }
);

export default HotelFacilitiesFilter;
