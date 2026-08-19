const NAV_ITEMS = [{ id: "students", label: "Students" }];

function Sidebar({ active = "students", onSelect }) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-7 bg-[#12304d]  py-6 text-[#12304d] md:flex">
      <div className="px-2">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          Logined
        </div>
        <div className="mt-1 text-xl font-bold text-white">Admin</div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`flex w-full items-center px-4 py-[11px] text-left text-[15px] font-medium transition cursor-pointer hover:bg-[#eef5ff] ${item.id === active ? "bg-white text-[#12304d] shadow-sm" : "text-[#12304d] hover:bg-[#c0dbff]"}`}
            onClick={() => onSelect?.(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
