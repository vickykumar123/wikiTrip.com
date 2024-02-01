import {useQuery} from "react-query";
import {useSearchContext} from "../context/SearchContext";
import {searchApi} from "../api/searchApi";
import {useState} from "react";
import HotelList from "../components/Hotel/HotelList";

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const {data: hotelData, isLoading} = useQuery(
    ["searchHotels", searchParams],
    () => searchApi(searchParams)
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* TODO Filter */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.totalDocument} Hotel found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* TODO sort options */}
        </div>

        {hotelData && <HotelList hotelData={hotelData.hotels} search={true} />}
      </div>
    </div>
  );
}
