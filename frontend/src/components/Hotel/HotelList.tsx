import {BiChild} from "react-icons/bi";
import {FaBed, FaBuilding, FaStar} from "react-icons/fa6";
import {MdFreeBreakfast, MdLocationOn, MdMan} from "react-icons/md";
import {formatCurrency} from "../../utils/helper";
import {Link} from "react-router-dom";
import {HotelType} from "backend/src/shared/types";
import {AiFillStar} from "react-icons/ai";
import {useSearchContext} from "../../context/SearchContext";

export default function HotelList({
  hotelData,
  search,
}: {
  hotelData: HotelType[];
  search?: boolean;
}) {
  const {checkIn, checkOut} = useSearchContext();
  const totalLivingDays = Math.abs(checkIn.getDate() - checkOut.getDate()) + 1;

  return (
    <div className="flex flex-col max-w-6xl gap-5">
      {hotelData.map((hotel) => (
        <div
          key={hotel._id}
          className={`flex border border-blue-300 rounded-lg  gap-2 ${
            search ? "md-gap-2" : "md:gap-9"
          } shadow-lg drop-shadow-lg shadow-slate-400 h-full`}
        >
          <div className="min-w-28 md:min-w-48">
            <img
              src={hotel.imageUrls[0]}
              className={`${
                search ? "object-cover" : "object-fill"
              } md:h-60 rounded-l-lg min-h-full max-w-36 md:max-w-56`}
            />
          </div>
          <div className="flex-1 md:p-1">
            <section>
              <div className="flex items-center justify-between ">
                <h1 className="flex  text-blue-600 font-extrabold  capitalize gap-2">
                  <Link
                    to={
                      search
                        ? `/detail/${hotel._id}`
                        : `/my-hotels/edit-hotel/${hotel._id}`
                    }
                    className="sm:text-2xl line-clamp-2"
                  >
                    {hotel.hotelName}
                  </Link>
                  <span className="flex items-center">
                    {Array.from({length: hotel.starRating}).map((_, i) => (
                      <AiFillStar key={i} className="fill-yellow-500 h-4" />
                    ))}
                  </span>
                </h1>
                <p
                  className="flex items-center font-semibold bg-blue-900 p-1 text-white text-xl rounded-tl-md
                rounded-br-md rounded-tr-md  space-x-1 m-2"
                >
                  <FaStar className="text-yellow-500 h-10" />
                  {hotel.starRating}
                  <span className="text-xs sm:text-sm">Rating</span>
                </p>
              </div>
              <p className="line-clamp-2 font-medium text-sm">
                {hotel.description}
              </p>
              <p className="flex items-center">
                <MdLocationOn className="h-4 w-4 text-green-600" />
                <span className="font-semibold p-1">
                  {hotel.city}, {hotel.country}
                </span>
              </p>

              <div className="flex  gap-2">
                <p className="flex gap-1 items-center">
                  <FaBuilding className="text-green-800" />
                  <span className="font-semibold italic text-sm">
                    {hotel.type}
                  </span>
                </p>
                <p className="flex gap-1 items-center">
                  <FaBed className="text-green-800" />
                  <span className="font-semibold italic text-sm">
                    {hotel.bed} {hotel.bed > 1 ? "beds" : "bed"}
                  </span>
                </p>
              </div>

              <p className="flex items-center font-semibold text-sm">
                <MdMan className="text-green-900 h-10" />
                {hotel.adultCount} Adult{" "}
                {hotel.childCount > 0 && (
                  <>
                    <BiChild className="text-green-900 h-10" />
                    {hotel.childCount} Children
                  </>
                )}
              </p>
            </section>
            <section className="flex justify-between">
              <div className="flex flex-col space-y-2">
                <p className="flex items-center">
                  <MdFreeBreakfast className="text-green-900" />
                  <span
                    className={
                      hotel.breakfast === "Yes"
                        ? "font-bold text-green-700"
                        : "font-bold text-red-700"
                    }
                  >
                    Breakfast{" "}
                    {hotel.breakfast === "Yes" ? "Included" : "not included"}
                  </span>
                </p>
                <div className="hidden md:flex flex-col md:flex-row gap-1 items-center">
                  {hotel.facilities.slice(0, 2).map((facility) => (
                    <span
                      className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
                      key={facility}
                    >
                      {facility}
                    </span>
                  ))}
                  <span className="text-sm">
                    {hotel.facilities.length > 2 &&
                      `+${hotel.facilities.length - 2} more`}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold text-sm">
                  <p className="flex flex-col text-2xl">
                    💸
                    {search &&
                      formatCurrency(hotel.pricePerNight * totalLivingDays)}
                    {!search && formatCurrency(hotel.pricePerNight)}
                    <span className="text-sm text-center italic text-gray-600">
                      {search ? `for ${totalLivingDays} night ` : "/per night"}
                    </span>
                  </p>
                </div>
              </div>
            </section>
            <span className="flex justify-end p-3">
              <Link
                to={
                  search
                    ? `/detail/${hotel._id}`
                    : `/my-hotels/edit-hotel/${hotel._id}`
                }
                className="flex bg-blue-600 text-white text-base sm:text-lg font-bold p-1 hover:bg-blue-500 rounded-md"
              >
                View Details
              </Link>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
