import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";
import {hotelFacilities} from "../../../contants/hotel-options";

export default function HotelFacilites() {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="text-sm flex items-center gap-1 text-gray-700"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              className="w-6 h-4 focus:outline-none  focus:ring-blue-300  bg-blue-50"
            />
            <span className="text-nowrap font-semibold">{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}
