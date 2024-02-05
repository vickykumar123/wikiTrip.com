import {Link} from "react-router-dom";
import {HotelType} from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
  latest?: boolean;
};

const LatestDestinationCard = ({hotel, latest}: Props) => {
  return (
    <Link
      to={`/search/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md shadow-lg shadow-slate-500 hover:shadow-xl"
    >
      <div className={`${latest ? "h-[500px]" : "h-[300px]"} `}>
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-2xl rounded-md  line-clamp-1">
          {hotel.hotelName}
        </span>
        <p className="text-white italic text-sm">
          {hotel.city},{hotel.country}
        </p>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
