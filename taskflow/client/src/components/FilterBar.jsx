
const FilterBar = ({filter, setFilter}) => {
  return (
    <div className="flex gap-4 mb-8">

      <button
        onClick={() => setFilter("all")}
        className={`px-6 py-2 text-white rounded
          ${filter === 'all' ? 'bg-gray-500' : 'bg-black'}
          `}
      >
        All
      </button>

      <button
        onClick={() => setFilter("pending")}
        className={`px-6 py-2 text-white rounded
          ${filter === 'pending' ? 'bg-gray-500' : 'bg-black'}
        `}
      >
        Pending
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={`px-6 py-2 text-white rounded
          ${filter === 'completed' ? 'bg-gray-500' : 'bg-black'}
        `}
      >
        Completed
      </button>

    </div>
  )
}

export default FilterBar