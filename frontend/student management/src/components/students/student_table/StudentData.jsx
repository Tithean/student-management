import { useState } from "react";

function attendanceStatus(late, absent) {
  const effectiveAbsent =
    Number(absent ?? 0) + Math.floor(Number(late ?? 0) / 3);
  if (effectiveAbsent <= 5) return { label: "Greate", color: "text-green-700" };
  if (effectiveAbsent <= 10) return { label: "Good", color: "text-yellow-600" };
  return { label: "Bad", color: "text-red-600" };
}

function StudentData({ student, onUpdate, onDelete, onAttendanceChange }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const status = attendanceStatus(student.late, student.absent);

  const chooseStatus = (value) => {
    onAttendanceChange(student.id, value);
    setSelectedStatus("");
  };

  return (
    <tr>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5 text-[#5d6e8c]">
        {student.id}
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5 font-medium text-[#12304d]">
        {student.name}
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5">
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${(student.gender || "").toLowerCase() === "female" ? " text-red-700" : " text-blue-700"}`}
        >
          {student.gender}
        </span>
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5 text-[#5d6e8c]">
        {student.dob}
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5">
        <select
          className="h-8.5 rounded-[7px] border border-[#dfeaf9] bg-white px-2 text-xs text-[#12304d] outline-none focus:border-[#0d4fa3] focus:ring-2 focus:ring-blue-100"
          value={selectedStatus}
          onChange={(event) => chooseStatus(event.target.value)}
        >
          <option value="">-</option>
          <option value="late">Late</option>
          <option value="absent">Absent</option>
          <option value="present">Present</option>
        </select>
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5 text-[#12304d]">
        {student.late}
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5 text-[#12304d]">
        {student.present}
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5 text-[#12304d]">
        {student.absent}
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5">
        <span className={`font-bold ${status.color}`}>{status.label}</span>
      </td>
      <td className="border-b border-[#dfeaf9] px-5 py-3.5">
        <div className="flex gap-4">
          <button
            type="button"
            className="bg-transparent p-0 text-xs font-semibold text-[#12304d] underline-offset-2 hover:underline"
            onClick={() => onUpdate(student)}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-transparent p-0 text-xs font-semibold text-red-600 underline-offset-2 hover:underline"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default StudentData;
