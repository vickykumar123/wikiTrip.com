import {FormEvent, useState} from "react";
import {MdOutlineTravelExplore} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useSearchContext} from "../../context/SearchContext";
import {CalendarDaysIcon} from "@heroicons/react/16/solid";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1); // 1year limit

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-7 p-[4px] bg-yellow-400 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 items-center gap-1"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2 rounded-lg h-full">
        <MdOutlineTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none "
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
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
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div className="flex items-center p-2 gap-1 bg-white rounded-lg font-medium text-sm 2xl:w-[300px] h-full">
        <CalendarDaysIcon className="h-7" />
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          dateFormat="MMMM d, yyyy"
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-[120px] focus:outline-none"
        />
        <p>-</p>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          dateFormat="MMMM d, yyyy"
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="w-[120px] bg-white md:min-w-full  focus:outline-none"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-full bg-blue-600 text-white h-full p-2 font-bold text-lg hover:bg-blue-500 rounded-md">
          Search
        </button>
        <button className="w-full bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500 rounded-md">
          Clear
        </button>
      </div>
    </form>
  );
}
