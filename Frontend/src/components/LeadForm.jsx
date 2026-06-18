import { useState } from "react";

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    status: "New"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "https://crm-backend-ta5h.onrender.com/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();
    console.log(data);

    alert("Lead Added!");
    window.location.reload();

    setFormData({
      name: "",
      email: "",
      phone: "",
      notes: "",
      status: "New"
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />
      <input
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white rounded-lg px-4 py-3
        hover:bg-blue-500
        active:bg-blue-700
        cursor-pointer
        transition"
      >
        Add Lead
      </button>
    </form>
  );
}

export default LeadForm;