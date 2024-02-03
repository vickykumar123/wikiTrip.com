import {formatCurrency} from "../../../utils/helper";

type PriceProps = {
  selectedPrice: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PriceFilter({selectedPrice, onChange}: PriceProps) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Your budget (per night)</h4>
      <input
        type="range"
        min={1000}
        max={10000}
        step={200}
        value={selectedPrice}
        onChange={onChange}
        className="w-full h-2"
      />
      <p className="italic text-base text-gray-700">
        {formatCurrency(selectedPrice)}/ night
      </p>
    </div>
  );
}
