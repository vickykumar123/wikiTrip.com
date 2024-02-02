export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({page, pages, onPageChange}: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-around items-center rounded-lg border border-slate-600">
      <ul className="flex  rounded-md p-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-3 py-1 rounded-3xl cursor-pointer font-medium ${
              page === number ? "bg-blue-500 text-white" : "hover:bg-blue-200"
            }`}
          >
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
      <p className="text-base font-medium">
        Showing {page} of {pages} pages
      </p>
    </div>
  );
}
