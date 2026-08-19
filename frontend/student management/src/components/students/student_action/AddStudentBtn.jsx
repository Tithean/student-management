function AddStudent({ onAddStudent = () => {} }) {
  return (
    <button
      type="button"
      className="whitespace-nowrap  bg-[#12304d] px-4.5 py-2.75 text-sm font-semibold text-white transition hover:bg-[#0e2741]"
      onClick={onAddStudent}
    >
      + Add Student
    </button>
  );
}

export default AddStudent;
