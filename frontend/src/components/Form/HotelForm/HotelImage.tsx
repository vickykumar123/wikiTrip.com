import {useFormContext} from "react-hook-form";
import {HotelFormData} from "./ManageHotelForm";

const HotelImage = () => {
  const {
    register,
    watch,
    setValue,
    formState: {errors},
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((image) => image !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="rounded p-4 flex flex-col gap-4 border border-blue-600">
        {existingImageUrls?.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group" key={url}>
                <img src={url} className="min-h-full object-cover" />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                  onClick={(event) => handleDelete(event, url)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className=" border-1 border-blue-400 rounded-md w-full file:bg-blue-500 file:border-blue-700 file:rounded-md file:h-11 file:m-1 file:text-white dark:text-sm  dark:text-blue-400 cursor-pointer shadow-lg h-13"
          {...register("images", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length ?? 0);

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
