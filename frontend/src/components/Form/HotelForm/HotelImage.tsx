import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

const HotelImage = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className=" border-2 border-blue-400 rounded-md w-full file:bg-blue-500 file:border-blue-700 file:rounded-md file:h-11 file:m-1 file:text-white dark:text-sm  dark:text-blue-400 cursor-pointer shadow-lg h-13"
          {...register("images", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.images && (
        <span className="text-red-500 text-sm font-bold">
          {errors.images.message}
        </span>
      )}
    </div>
  );
};

export default HotelImage;
