function StudentStat({ students }) {
  const total = students.length;
  return (
    <section className="mt-4 flex flex-col items-end gap-1.5 text-md text-[#5d6e8c]">
      <p className="m-0">
        Total Students: <strong className="text-[#12304d]">{total}</strong>
      </p>
    </section>
  );
}

export default StudentStat;
