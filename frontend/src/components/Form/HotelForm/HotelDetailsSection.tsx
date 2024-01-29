import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";
import {countryOptions} from "../../../contants/country";

export default function HotelDetailsSection() {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        List your hotel at wikiTrip.com
      </h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Hotel Name
        <input
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
          {...register("hotelName", {required: "This field is required"})}
        />
        {errors.hotelName && (
          <span className="text-red-500">{errors.hotelName.message}</span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
            {...register("city", {required: "This field is required"})}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <select
            className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
            {...register("country", {required: "This field is required"})}
          >
            {countryOptions.map((country) => (
              <option
                key={country.value}
                className="font-semibold bg-gray-200"
                value={country.value}
              >
                {country.label}
              </option>
            ))}
          </select>
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
          {...register("description", {required: "This field is required"})}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
          {...register("pricePerNight", {required: "This field is required"})}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Beds
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
          {...register("bed", {required: "This field is required"})}
        />
        {errors.bed && (
          <span className="text-red-500">{errors.bed.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", {
            required: "This field is required",
          })}
          className="border rounded w-full py-1 px-2 font-normal focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-1 bg-blue-50"
        >
          <option value="" className="text-sm font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num, i) => (
            <option key={i} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}
