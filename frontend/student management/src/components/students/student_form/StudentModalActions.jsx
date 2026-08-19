function StudentModalActions({ isEditing, onClose }) {
  return (
    <div className="mt-5.5 flex justify-end gap-2.5">
      <button
        type="button"
        className="rounded-[10px] border border-[#dfeaf9] bg-white px-4.5 py-2.75 text-sm font-semibold text-[#12304d] hover:bg-[#edf6ff]"
        onClick={onClose}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-[10px] bg-[#12304d] px-4.5 py-2.75 text-sm font-semibold text-white hover:bg-[#0e2741]"
      >
        {isEditing ? "Update" : "Save"}
      </button>
    </div>
  );
}

export default StudentModalActions;
