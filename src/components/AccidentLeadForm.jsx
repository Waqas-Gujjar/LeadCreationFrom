// AccidentLeadForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { US_STATES } from "./states";

const initialFormState = {
  lead_first_name: "",
  lead_last_name: "",
  lead_email: "",
  lead_phone: "",
  zip_code: "",
  state: "",
  incident_date_option_b: "",
  were_you_at_fault: "",
  were_you_injured: "",
  have_attorney: "",
  doctor_treatment: "",
  certificate_type: "",
  certificate_id: "",
  certificate_url: "",
  source_url: "",
  comments: "",
  ip_address: ""
};

export default function AccidentLeadForm() {
  const [formData, setFormData] = useState(initialFormState);

  // Get IP Address on mount
  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((res) => {
      setFormData((prev) => ({ ...prev, ip_address: res.data.ip }));
    });
  }, []);

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
        { ref: "were_you_at_fault", answer: formData.were_you_at_fault },
        { ref: "were_you_injured", answer: formData.were_you_injured },
        { ref: "have_attorney", answer: formData.have_attorney },
        { ref: "doctor_treatment", answer: formData.doctor_treatment },
        { ref: "comments", answer: formData.comments }
      ]
    };

    try {
      const res = await axios.post(
        "https://api.accident.com/api/lead-create",
        payload,
        {
          headers: {
            "api-key": "57REEZFS-DVx9-Xo0g-Z8sA-S8jJU3QVrYXe",
            "api-secret": "250fbd13db1334ff1a141a1bb5077f7b2a91b9ec",
            "Content-Type": "application/json"
          }
        }
      );
      alert("Lead submitted successfully!");
      console.log(res.data);
      setFormData(initialFormState);
    } catch (err) {
      alert("Error submitting lead");
      console.error(err);
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

        {/* Name & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="lead_first_name" placeholder="First Name" value={formData.lead_first_name} onChange={handleChange} required className="border rounded-lg p-3" />
          <input name="lead_last_name" placeholder="Last Name" value={formData.lead_last_name} onChange={handleChange} required className="border rounded-lg p-3" />
          <input name="lead_email" type="email" placeholder="Email" value={formData.lead_email} onChange={handleChange} required className="border rounded-lg p-3" />
          <input name="lead_phone" placeholder="Phone" value={formData.lead_phone} onChange={handleChange} required className="border rounded-lg p-3" />
          <input name="zip_code" placeholder="ZIP Code" value={formData.zip_code} onChange={handleChange} required className="border rounded-lg p-3" />
          <select name="state" value={formData.state} onChange={handleChange} required className="border rounded-lg p-3">
            <option value="">Select State</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* Additional Accident Fields */}
        <select name="incident_date_option_b" value={formData.incident_date_option_b} onChange={handleChange} required className="border rounded-lg p-3 w-full">
          <option value="">When did the accident happen?</option>
          <option>Less than 1 year</option>
          <option>Less than 2 years</option>
          <option>Less than 3 years</option>
          <option>MM-DD-YYYY</option>
        </select>

        <select name="were_you_at_fault" value={formData.were_you_at_fault} onChange={handleChange} required className="border rounded-lg p-3 w-full">
          <option value="">Were you at fault?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="were_you_injured" value={formData.were_you_injured} onChange={handleChange} required className="border rounded-lg p-3 w-full">
          <option value="">Were you injured?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="have_attorney" value={formData.have_attorney} onChange={handleChange} required className="border rounded-lg p-3 w-full">
          <option value="">Do you have an attorney?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="doctor_treatment" value={formData.doctor_treatment} onChange={handleChange} required className="border rounded-lg p-3 w-full">
          <option value="">Did you receive medical treatment?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select name="certificate_type" value={formData.certificate_type} onChange={handleChange} required className="border rounded-lg p-3 w-full">
          <option value="">Certificate Type</option>
          <option>Jornaya</option>
          <option>Trusted Form</option>
        </select>

        <input name="certificate_id" placeholder="Certificate ID" value={formData.certificate_id} onChange={handleChange} required className="border rounded-lg p-3 w-full" />
        <input name="certificate_url" type="url" placeholder="Certificate URL" value={formData.certificate_url} onChange={handleChange} required className="border rounded-lg p-3 w-full" />
        <input name="source_url" type="url" placeholder="Source URL" value={formData.source_url} onChange={handleChange} required className="border rounded-lg p-3 w-full" />

        {/* Comments */}
        <textarea name="comments" placeholder="Describe your case" value={formData.comments} onChange={handleChange} className="border rounded-lg p-3 w-full" />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
          Submit Lead
        </button>
      </form>
    </div>
  );
}
