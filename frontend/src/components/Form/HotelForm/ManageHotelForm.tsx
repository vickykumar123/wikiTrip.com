import {FormProvider, useForm} from "react-hook-form";
import HotelDetailsSection from "./HotelDetailsSection";
import HotelTypes from "./HotelTypes";
import HotelFacilites from "./HotelFacilites";
import HotelGuests from "./HotelGuests";
import HotelImage from "./HotelImage";
import HotelBreakfast from "./HotelBreakfast";
import {HotelType} from "backend/src/shared/model.types";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export type HotelFormData = {
  hotelName: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  images: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  bed: number;
  breakfast: string;
};

interface Props {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
}

export default function ManageHotelForm({onSave, isLoading, hotel}: Props) {
  const navigate = useNavigate();
  const formMethods = useForm<HotelFormData>();
  const {handleSubmit, reset} = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((hotelInput: HotelFormData) => {
    const formData = new FormData();
    formData.append("hotelName", hotelInput.hotelName);
    formData.append("city", hotelInput.city);
    formData.append("country", hotelInput.country);
    formData.append("description", hotelInput.description);
    formData.append("type", hotelInput.type);
    formData.append("pricePerNight", hotelInput.pricePerNight.toString());
    formData.append("bed", hotelInput.bed.toString());
    formData.append("starRating", hotelInput.starRating.toString());
    formData.append("adultCount", hotelInput.adultCount.toString());
    formData.append("childCount", hotelInput.childCount.toString());
    formData.append("breakfast", hotelInput.breakfast);

    hotelInput.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(hotelInput.images).forEach((image) => {
      formData.append(`images`, image);
    });
    onSave(formData);
    reset();
  });

  return (
    <FormProvider {...formMethods}>
      <p
        onClick={() => navigate(-1)}
        className="hover:underline cursor-pointer mb-3 text-blue-500 font-semibold"
      >
        &#x25c0; Back to My Hotels
      </p>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <HotelDetailsSection />
        <HotelTypes />
        <HotelBreakfast />
        <HotelFacilites />
        <HotelGuests />
        <HotelImage />
        <span className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500 rounded-md w-full sm:w-60 ring-blue-700 ring-offset-2 ring disabled:opacity-55"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}
