import {useMutation} from "react-query";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";
import {useAppContext} from "../context/AppContext";
import {addMyHotel} from "../api/hotelApi";
import {useNavigate} from "react-router-dom";

export default function CreateHotel() {
  const {showToast} = useAppContext();
  const navigate = useNavigate();

  const {mutate, isLoading, reset} = useMutation(addMyHotel, {
    onSuccess: () => {
      reset();
      showToast({message: "Hotel Created Successfully", type: "SUCCESS"});
      navigate("/my-hotels");
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
