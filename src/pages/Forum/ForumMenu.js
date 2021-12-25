import Filters from "./Filters";
import Sort from "./Sort";

const ForumMenu = ({ sortBy, setSortBy, filters, setFilters }) => {
  return (
    <div className='relative flex justify-between items-center sm:justify-start'>
      <Filters filters={filters} setFilters={setFilters} />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  )
}

export default ForumMenu;