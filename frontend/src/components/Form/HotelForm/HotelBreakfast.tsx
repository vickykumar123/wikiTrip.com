import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";
import {breakfastOptions} from "../../../contants/hotel-options";

export default function HotelBreakfast() {
  const {
    register,
    watch,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  const breakfastWatch = watch("breakfast");

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-3">Breakfast Included ?</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {breakfastOptions.map((breakfast) => (
          <label
            key={breakfast}
            className={
              breakfastWatch === breakfast
                ? "cursor-pointer bg-blue-900 text-sm rounded-full px-4 py-2 font-semibold text-white"
                : "cursor-pointer bg-blue-100 text-sm rounded-full px-4 py-2 font-semibold hover:bg-blue-700"
            }
          >
            <input
              type="radio"
              value={breakfast}
              {...register("breakfast", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{breakfast}</span>
          </label>
        ))}
      </div>
      {errors.breakfast && (
        <span className="text-red-500 text-sm font-bold">
          {errors.breakfast.message}
        </span>
      )}
    </div>
  );
}
