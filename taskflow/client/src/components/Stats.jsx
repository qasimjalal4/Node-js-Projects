

const Stats = ({total, completed , pending}) => {
  return (
    <div className="flex gap-6 mb-6">

      <div className="bg-white py-4 px-6 rounded shadow flex flex-col justify-center items-center">
        <p className="text-xl">Total</p>
        <h2 className="text-2xl font-bold">
          {total}
        </h2>
      </div>

      <div className="bg-white py-4 px-8 rounded shadow flex flex-col justify-center items-center">
        <p className="text-xl">Completed</p>
        <h2 className="text-2xl font-bold">
          {completed}
        </h2>
      </div>

      <div className="bg-white py-4 px-8 rounded shadow flex flex-col justify-center items-center">
        <p className="text-xl">Pending</p>
        <h2 className="text-2xl font-bold">
          {pending}
        </h2>
      </div>

    </div>
  )
}

export default Stats