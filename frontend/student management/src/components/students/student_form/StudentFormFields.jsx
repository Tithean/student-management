const GENDERS = ["Male", "Female"];

function StudentFormFields({ form, errors, onChange }) {
  return (
    <div>
      <label className="mb-3.5 flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-[#1f3d5f]">Name</span>
        <input
          className="h-10.5 border border-[#12304d] bg-white px-3 text-sm text-[#12304d] outline-none focus:border-[#12304d] focus:ring-4 focus:ring-blue-100"
          placeholder="Student name"
          type="text"
          value={form.name}
          onChange={onChange("name")}
        />
      </label>
      {errors.name && (
        <p className="-mt-2.5 mb-3 text-xs text-red-600">{errors.name}</p>
      )}

      <label className="mb-3.5 flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-[#1f3d5f]">Gender</span>
        <div className="flex gap-4 text-sm text-[#12304d]">
          {GENDERS.map((gender) => (
            <label key={gender} className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={form.gender === gender}
                onChange={onChange("gender")}
                className="h-3.5 w-3.5 accent-[#12304d]"
              />
              <span>{gender}</span>
            </label>
          ))}
        </div>
      </label>
      {errors.gender && (
        <p className="-mt-2.5 mb-3 text-xs text-red-600">{errors.gender}</p>
      )}

      <label className="mb-3.5 flex flex-col gap-1.5">
        <span className="text-[13px] font-semibold text-[#1f3d5f]">
          Date of birth
        </span>
        <input
          className="h-10.5 border border-[#12304d] bg-white px-3 text-sm text-[#12304d] outline-none focus:border-[#12304d] focus:ring-4 focus:ring-blue-100"
          type="date"
          value={form.dob}
          onChange={onChange("dob")}
        />
      </label>
      {errors.dob && (
        <p className="-mt-2.5 mb-3 text-xs text-red-600">{errors.dob}</p>
      )}
    </div>
  );
}

export default StudentFormFields;
