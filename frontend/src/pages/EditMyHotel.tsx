import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {hotelById} from "../api/hotelApi";
import ManageHotelForm from "../components/Form/HotelForm/ManageHotelForm";

export default function EditMyHotel() {
  const {hotelId} = useParams();

  const {data: hotel} = useQuery("hotelById", () => hotelById(hotelId!));
  return <ManageHotelForm hotel={hotel} />;
}
