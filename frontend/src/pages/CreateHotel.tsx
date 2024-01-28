import {useMutation} from "react-query";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";
import {useAppContext} from "../context/AppContext";
import {addMyHotel} from "../api/hotelApi";

export default function CreateHotel() {
  const {showToast} = useAppContext();

  const {mutate, isLoading, reset} = useMutation(addMyHotel, {
    onSuccess: () => {
      reset();
      showToast({message: "Hotel Created Successfully", type: "SUCCESS"});
    },
    onError: () => {
      showToast({message: "Error in creating hotel", type: "ERROR"});
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
}
