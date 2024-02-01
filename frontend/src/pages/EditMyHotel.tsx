import {QueryClient, useMutation, useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {hotelById, updateMyHotelById} from "../api/hotelApi";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";
import {useAppContext} from "../context/AppContext";

export default function EditMyHotel() {
  const {hotelId} = useParams();
  const {showToast} = useAppContext();
  const queryClient = new QueryClient();

  const {data: hotel, isLoading: dataLoading} = useQuery("hotelById", () =>
    hotelById(hotelId!)
  );

  const {mutate, isLoading} = useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({message: "Hotel Saved!", type: "SUCCESS"});
    },
    onError: () => {
      showToast({message: "Error Saving Hotel", type: "ERROR"});
    },
    onSettled: () => {
      // Invalidate the 'hotelById' query when the mutation is complete
      queryClient.invalidateQueries({queryKey: ["hotelById"]});
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  if (dataLoading) return <div>Loading...</div>;

  if (hotel === null)
    return <div className="text-center font-bold text-2xl">🙅🏻🙅🏻 No data.</div>;

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
}
