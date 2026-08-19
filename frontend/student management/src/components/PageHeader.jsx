
function PageHeader() {
  return (
    <header className="mb-7 flex flex-col items-start justify-between gap-6 md:flex-row">
      <div>
        <h1 className="mb-1.5 text-[26px] font-bold text-[#12304d] cursor-pointer hover:underline decoration-1">
          Class {">"} SE {">"} RSE009
        </h1>
        <p className="max-w-155 text-sm leading-relaxed text-[#5d6e8c]">
          Student List
        </p>
      </div>
    </header>
  );
}

export default PageHeader;
