import { useState } from "react";
import StudentFormFields from "./StudentFormFields";
import StudentModalActions from "./StudentModalActions";

const EMPTY_FORM = { name: "", gender: "", dob: "" };

function AddStudentModal({ student, onClose, onSubmit }) {
  const isEditing = Boolean(student);
  const [form, setForm] = useState(student || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const updateField = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value });
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.gender) nextErrors.gender = "Gender is required";
    if (!form.dob) nextErrors.dob = "Date of birth is required";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({ ...form, name: form.name.trim() });
    if (!isEditing) setForm(EMPTY_FORM);
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-50/5 p-4 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-110 rounded-[18px] bg-white px-7 py-6.5 shadow-[0_24px_60px_rgba(13,63,116,0.22)]"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="mb-1 text-xl font-bold text-[#12304d]">
          {isEditing ? "Update student" : "Add student"}
        </h2>
        <p className="mb-5 text-[13px] text-[#5d6e8c]">
          {isEditing
            ? "Update the student details."
            : "Fill in the details to register a new student."}
        </p>

        <form onSubmit={handleSubmit}>
          <StudentFormFields
            form={form}
            errors={errors}
            onChange={updateField}
          />
          <StudentModalActions isEditing={isEditing} onClose={onClose} />
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;
