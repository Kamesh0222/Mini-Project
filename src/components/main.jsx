import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const Main = () => {
  const username = "Kamesh";
  const [qrData, setQrData] = useState([
    { id: 1, type: "Text", date: "2024-09-24", qr: "QR1" },
    { id: 2, type: "Image", date: "2024-09-23", qr: "QR2" },
    { id: 3, type: "Video", date: "2024-09-22", qr: "QR3" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedType, setSelectedType] = useState("text");
  const [qrContent, setQrContent] = useState("");
  const [generatedQR, setGeneratedQR] = useState(null);

  const handleDelete = (id) => {
    setQrData(qrData.filter((item) => item.id !== id));
  };

  const handleGenerateQr = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setQrContent("");
    setSelectedType("text");
    setGeneratedQR(null);
  };

  const handleUploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET 
    );
  
    try {
      const response = await fetch(
        import.meta.env.VITE_CLOUDINARY_URL, 
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Uploaded to Cloudinary:", data.secure_url);
      setQrContent(data.secure_url); 
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };
  

  const handleGenerateButtonClick = () => {
    if (qrContent) {
      setGeneratedQR(qrContent);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qrCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const imgURI = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = imgURI;
      downloadLink.download = "qr_code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = url;
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setQrContent("");
    setGeneratedQR(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
      <div className="text-center py-8 w-full">
        <h1 className="text-5xl font-bold">QR GENERATOR</h1>
        <div className="flex justify-between mt-6 items-center max-w-5xl mx-auto w-full px-6">
          <h2 className="text-xl">Welcome, {username}</h2>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleGenerateQr}
          >
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg relative">
            <h2 className="text-2xl mb-4">Generate QR Code</h2>

            <div className="mb-4">
              <label className="block mb-2">Choose QR type:</label>
              <select
                className="text-gray-900 px-3 py-2 rounded-md w-full"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>

            {selectedType === "text" ? (
              <input
                type="text"
                placeholder="Enter text for QR"
                className="w-full px-4 py-2 mb-4 text-gray-900 rounded-md"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
              />
            ) : (
              <input
                type="file"
                accept={selectedType === "image" ? "image/*" : "video/*"}
                className="mb-4"
                onChange={(e) => handleUploadToCloudinary(e.target.files[0])}
              />
            )}

            {generatedQR && (
              <div className="text-center mb-4">
                <QRCodeSVG id="qrCode" value={generatedQR} size={256} />
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handleGenerateButtonClick}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Generate QR
              </button>

              {generatedQR && (
                <button
                  onClick={handleDownloadQR}
                  className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700"
                >
                  Download QR
                </button>
              )}

              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
