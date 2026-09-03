
const ConfirmModal = ({taskTitle,onCancel,onConfirm}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[395px]">
        <h2 className="text-xl font-bold mb-6">Delete task?</h2>
        <p className="font-semibold text-gray-600 mb-4">Are u sure, u want to delete "{taskTitle}" ?</p>
        <div className="flex justify-end gap-3 mr-1">
          <button
           className="bg-black py-1 px-2 text-white border-none rounded-md text-sm
           active:opacity-80 transition-opacity
           "
           onClick={onConfirm}
          >Delete</button>
          <button
           className="bg-gray-300 py-1 px-2 text-black border-none rounded-md text-sm
            active:opacity-80 transition-opacity
           "

           onClick={onCancel}
          >Cancel</button>

        </div>
      </div>
    </div>
  )
}

export default ConfirmModal