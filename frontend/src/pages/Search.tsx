import {useQuery} from "react-query";
import {useSearchContext} from "../context/SearchContext";
import {SearchParam, searchApi} from "../api/searchApi";
import {useState} from "react";
import HotelList from "../components/Hotel/HotelList";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/Search/SearchFilters/StarRatingFilter";
import HotelTypesFilter from "../components/Search/SearchFilters/HotelTypesFilter";
import {handleChange} from "../utils/filterOnChange";
import HotelFacilitiesFilter from "../components/Search/SearchFilters/HotelFacilitiesFilter";
import PriceFilter from "../components/Search/SearchFilters/PriceFilter";

export default function Search() {
  const search = useSearchContext();
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [seletedStars, setSeletedStars] = useState<string[]>([]);
  const [seletedHotelType, setSeletedHotelType] = useState<string[]>([]);
  const [seletedFacilities, setSeletedFacilities] = useState<string[]>([]);
  const [seletedPrice, setSeletedPrice] = useState<number>(6000);
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams: SearchParam = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: seletedStars,
    type: seletedHotelType,
    facilities: seletedFacilities,
    maxPrice: seletedPrice.toString(),
    sortOptions: sortOption,
  };

  const {data: hotelData, isLoading} = useQuery(
    ["searchHotels", searchParams],
    () => searchApi(searchParams)
  );

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeletedPrice(parseInt(event.target.value));
  };

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(event, setSeletedStars);

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(event, setSeletedHotelType);

  const handleHotelFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => handleChange(event, setSeletedFacilities);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
        <div className="space-y-5">
          <button
            onClick={() => setShowFilter((show) => !show)}
            className="text-lg font-semibold border-b border-slate-300 pb-2 text-white w-full bg-blue-700 rounded-md hover:opacity-85 shadow-lg shadow-slate-400"
          >
            {!showFilter && "Show"} Filter by:
          </button>
          {showFilter && (
            <>
              <PriceFilter
                selectedPrice={seletedPrice}
                onChange={handlePriceChange}
              />
              <StarRatingFilter
                selectedStars={seletedStars}
                onChange={handleStarsChange}
              />
              <HotelTypesFilter
                selectedHotelTypes={seletedHotelType}
                onChange={handleHotelTypeChange}
              />
              <HotelFacilitiesFilter
                seletedHotelFacilities={seletedFacilities}
                onChange={handleHotelFacilitiesChange}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.totalDocument} Hotel found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* Sorting */}
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-offset-1  focus:ring-blue-400"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
            <option value="lastest">Latest Hotel</option>
          </select>
        </div>
        {isLoading && <div>Loading....</div>}
        {!isLoading && hotelData && (
          <HotelList hotelData={hotelData.hotels} search={true} />
        )}

        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
