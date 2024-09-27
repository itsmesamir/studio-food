import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { register, handleSubmit, control, reset } = useForm();

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "staff", label: "Staff" },
    { value: "manager", label: "Manager" },
  ];

  const handleFormSubmit = (formData: any) => {
    const payload = {
      ...formData,
      role: formData.role?.value || "user",
      email: formData.email || null,
      password: formData.password || null,
    };

    onSubmit(payload);
    reset();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center py-36">
      <div className="bg-white p-6 rounded shadow-md w-1/3 h-fit">
        <div className="flex flex-col justify-center relative">
          <h2 className="text-lg font-bold mb-4">Add New User</h2>
          <button
            className="absolute right-2 text-gray-600 hover:text-gray-900 focus:outline-none font-larger mb-4"
            onClick={onClose}
          >
            &times; {/* "X" close button */}
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Designation</label>
            <input
              {...register("designation", { required: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Department</label>
            <input
              {...register("department", { required: true })}
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <Controller
              name="role"
              control={control}
              defaultValue={roleOptions[1]}
              render={({ field }) => (
                <Select
                  {...field}
                  options={roleOptions}
                  className="basic-select"
                  classNamePrefix="select"
                />
              )}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Email (Optional)
            </label>
            <input
              {...register("email")}
              type="email"
              className="border rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">
              Password (Optional)
            </label>
            <input
              {...register("password")}
              type="password"
              className="border rounded w-full p-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
