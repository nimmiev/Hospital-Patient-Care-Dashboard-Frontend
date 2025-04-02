import React, { useState } from "react";

const patientsData = [
  { id: 1, name: "Cy Ganderton", job: "Quality Control Specialist", color: "Blue" },
  { id: 2, name: "Hart Hagerty", job: "Desktop Support Technician", color: "Purple" },
  { id: 3, name: "Brice Swyre", job: "Tax Accountant", color: "Red" },
  { id: 4, name: "Jane Doe", job: "Nurse", color: "Green" },
  { id: 5, name: "John Smith", job: "Surgeon", color: "Yellow" },
  { id: 6, name: "Emily Johnson", job: "Radiologist", color: "Pink" },
  { id: 7, name: "Daniel Brown", job: "Pharmacist", color: "Orange" },
  { id: 8, name: "Michael White", job: "Anesthesiologist", color: "Teal" },
  { id: 9, name: "Cy Ganderton", job: "Quality Control Specialist", color: "Blue" },
  { id: 10, name: "Hart Hagerty", job: "Desktop Support Technician", color: "Purple" },
  { id: 11, name: "Brice Swyre", job: "Tax Accountant", color: "Red" },
  { id: 12, name: "Jane Doe", job: "Nurse", color: "Green" },
  { id: 13, name: "John Smith", job: "Surgeon", color: "Yellow" },
  { id: 14, name: "Emily Johnson", job: "Radiologist", color: "Pink" },
  { id: 15, name: "Daniel Brown", job: "Pharmacist", color: "Orange" },
  { id: 16, name: "Michael White", job: "Anesthesiologist", color: "Teal" },
  { id: 17, name: "John Smith", job: "Surgeon", color: "Yellow" },
  { id: 18, name: "Emily Johnson", job: "Radiologist", color: "Pink" },
  { id: 19, name: "Daniel Brown", job: "Pharmacist", color: "Orange" },
  { id: 20, name: "Michael White", job: "Anesthesiologist", color: "Teal" },
];

const AppoinmentList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination logic
  const totalPages = Math.ceil(patientsData.length / itemsPerPage);
  const paginatedData = patientsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary">Appoinment List</h2>

      {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
      <div className="overflow-x-auto rounded-lg border border-base-content/10 bg-base-100 shadow-lg">
        <table className="table w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Favorite Color</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {paginatedData.map((patient, index) => (
              <tr
                key={patient.id}
                className="hover:bg-base-200 transition duration-200"
              >
                <td className="p-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="p-3">{patient.name}</td>
                <td className="p-3">{patient.job}</td>
                <td className="p-3">{patient.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="join">
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`join-item btn ${currentPage === index + 1 ? "btn-primary" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentList;

