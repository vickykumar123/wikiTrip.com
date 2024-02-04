import {useForm} from "react-hook-form";
import {formatCurrency} from "../../../utils/helper";
import ReactDatePicker from "react-datepicker";
import {useSearchContext} from "../../../context/SearchContext";
import {useAppContext} from "../../../context/AppContext";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export default function GuestInfoForm({hotelId, pricePerNight}: Props) {
  const search = useSearchContext();
  const {isLoggedIn} = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const totalLivingDays =
    Math.abs(search.checkIn.getDate() - search.checkOut.getDate()) + 1;

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  function onSignInClick(data: GuestInfoFormData) {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate("/sign-in", {state: {from: location}});
  }

  function onSubmit(data: GuestInfoFormData) {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel/${hotelId}/booking`);
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4 rounded-md shadow-lg shadow-slate-400">
      <h3 className="text-md font-bold">
        <span className="text-sm font-medium italic">
          Total Cost for {totalLivingDays} days is{" "}
        </span>
        💸{formatCurrency(pricePerNight * totalLivingDays)}{" "}
      </h3>

      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-2 items-center">
          <div>
            <p className="text-sm font-medium italic text-violet-900">
              Check-in Date
            </p>
            <ReactDatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              dateFormat="MMMM d, yyyy"
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none rounded-md font-medium"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <p className="text-sm font-medium italic text-violet-900">
              Check-out Date
            </p>
            <ReactDatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              dateFormat="MMMM d, yyyy"
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="min-w-full bg-white p-2 focus:outline-none rounded-md font-medium"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex bg-white px-2 py-1 gap-2 rounded-lg h-full font-medium">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be atleast one Adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
            {isLoggedIn ? "Book Now" : "Sign in to Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
