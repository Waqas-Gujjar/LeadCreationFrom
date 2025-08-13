import React, { useState } from "react";
import axios from "axios";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming"
];

export default function AccidentLeadForm() {
  const [formData, setFormData] = useState({
    lead_first_name: "",
    lead_last_name: "",
    lead_email: "",
    lead_phone: "",
    zip_code: "",
    state: "",
    certificate_type: "Jornaya",
    certificate_id: "",
    certificate_url: "",
    source_url: "",
    ip_address: "",
    incident_date_option_b: "",
    were_you_injured: "Yes",
    were_you_at_fault: "No",
    have_attorney: "No",
    doctor_treatment: "Yes",
    expressed_interest: "Yes",
    injury_cause: "Car Accident",
    primary_injury: "Back or Neck Pain",
    settled_insurance: "No",
    signed_retainer: "No",
    driver_insurance: "Yes",
    role_in_accident: "driver",
    accident_vehicle_count: "1",
    comments: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      arrived_at: new Date().toISOString(),
      test_mode: false,
      deal: "eQxK9n0XBrdbWwygYMmAPNO4aV2JvY",
      lead_first_name: formData.lead_first_name,
      lead_last_name: formData.lead_last_name,
      lead_email: formData.lead_email,
      lead_phone: formData.lead_phone,
      case_type: "Auto Accident",
      zip_code: formData.zip_code,
      certificate_type: formData.certificate_type,
      certificate_id: formData.certificate_id,
      certificate_url: formData.certificate_url,
      source_url: formData.source_url,
      ip_address: formData.ip_address,
      fields: [
        { ref: "incident_date_option_b", answer: formData.incident_date_option_b },
        { ref: "were_you_injured", answer: formData.were_you_injured },
        { ref: "were_you_at_fault", answer: formData.were_you_at_fault },
        { ref: "injury_cause", answer: formData.injury_cause },
        { ref: "expressed_interest", answer: formData.expressed_interest },
        { ref: "have_attorney", answer: formData.have_attorney },
        { ref: "primary_injury", answer: formData.primary_injury },
        { ref: "doctor_treatment", answer: formData.doctor_treatment },
        { ref: "accident_vehicle_count", answer: formData.accident_vehicle_count },
        { ref: "settled_insurance", answer: formData.settled_insurance },
        { ref: "signed_retainer", answer: formData.signed_retainer },
        { ref: "driver_insurance", answer: formData.driver_insurance },
        { ref: "role_in_accident", answer: formData.role_in_accident },
        { ref: "comments", answer: formData.comments }
      ]
    };

    try {
      const res = await axios.post(
        "https://api.accident2.dev/api/lead-create",
        payload,
        {
          headers: {
            "api-key": "2g62oap5-0ao9-nT4U-JSBg-RYj8nPnRb8X6",
            "api-secret": "28788c5c5c346728bac8bbfd74e3e2d5dc8b22e4",
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Response:", res.data);
      alert("Lead submitted successfully!");
    } catch (err) {
      console.error("Error submitting lead:", err);
      alert("Error submitting lead");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3">
          Auto Accident Lead Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="lead_first_name"
            placeholder="First Name"
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lead_last_name"
            placeholder="Last Name"
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lead_email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="lead_phone"
            placeholder="Phone"
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="zip_code"
            placeholder="ZIP Code"
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="state"
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <textarea
          name="comments"
          placeholder="Describe your case"
          onChange={handleChange}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-300"
        >
          Submit Lead
        </button>
      </form>
    </div>
  );
}
