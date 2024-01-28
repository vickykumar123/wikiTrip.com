import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";
import {hotelTypes} from "../../../contants/hotel-options";

export default function HotelTypes() {
  const {
    register,
    watch,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type of Hotel</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-900 text-sm rounded-full px-4 py-2 font-semibold text-white"
                : "cursor-pointer bg-blue-100 text-sm rounded-full px-4 py-2 font-semibold hover:bg-blue-700"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}
