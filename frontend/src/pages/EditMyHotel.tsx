import {useMutation, useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {hotelById, updateMyHotelById} from "../api/hotelApi";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";
import {useAppContext} from "../context/AppContext";

export default function EditMyHotel() {
  const {hotelId} = useParams();
  const {showToast} = useAppContext();

  const {data: hotel} = useQuery("hotelById", () => hotelById(hotelId!));

  const {mutate, isLoading} = useMutation(updateMyHotelById, {
    onSuccess: () => {
      showToast({message: "Hotel Saved!", type: "SUCCESS"});
    },
    onError: () => {
      showToast({message: "Error Saving Hotel", type: "ERROR"});
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  );
}
