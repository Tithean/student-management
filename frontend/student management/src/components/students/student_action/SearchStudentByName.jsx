function SearchStudentByName({ search = "", onSearchChange = () => {} }) {
  return (
    <input
      type="search"
      className="h-10.5 w-full max-w-95 border border-[#12304d] bg-white px-3.5 text-sm text-[#12304d] outline-none focus:border-[#12304d] focus:ring-4 focus:ring-[#dfeaf9]"
      placeholder="Search students by name..."
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
    />
  );
}

export default SearchStudentByName;
