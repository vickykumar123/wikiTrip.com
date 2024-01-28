import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

const HotelGuests = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-blue-300 rounded-lg">
        <label className="text-gray-900 text-sm font-semibold">
          Adults
          <input
            defaultValue={0}
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-gray-900 text-sm font-semibold">
          Children
          <input
            defaultValue={0}
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm fold-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default HotelGuests;
