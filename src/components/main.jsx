import React, { useState } from "react";

const Main = () => {
  const username = "Kamesh";
  const [qrData, setQrData] = useState([
    { id: 1, type: "Text", date: "2024-09-24", qr: "QR1" },
    { id: 2, type: "Image", date: "2024-09-23", qr: "QR2" },
    { id: 3, type: "Video", date: "2024-09-22", qr: "QR3" },
  ]);

  const handleDelete = (id) => {
    setQrData(qrData.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <div className="text-center py-8 w-full">
        <h1 className="text-5xl font-bold">QR GENERATOR</h1>
        <div className="flex justify-between mt-6 items-center max-w-5xl mx-auto w-full px-6">
          <h2 className="text-xl">Welcome, {username}</h2>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Generate QR
          </button>
        </div>
      </div>
      <div className="w-full max-w-5xl mt-8">
        <div className="grid grid-cols-5 bg-gray-700 font-bold text-center py-4 rounded-t-md">
          <div>S.No</div>
          <div>Type</div>
          <div>Date</div>
          <div>View QR</div>
          <div>Delete</div>
        </div>

        {qrData.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-5 bg-gray-800 border-b border-gray-700 py-4 text-center"
          >
            <div>{index + 1}</div>
            <div>{item.type}</div>
            <div>{item.date}</div>
            <div>
              <button className="text-blue-500 hover:underline">View QR</button>
            </div>
            <div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {qrData.length === 0 && (
          <div className="text-center mt-6 text-gray-400">
            No QR codes generated yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
