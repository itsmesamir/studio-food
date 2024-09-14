import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";
import {
  FaCamera,
  FaRegTimesCircle,
  FaCheckCircle,
  FaRedoAlt,
} from "react-icons/fa";
import "../../../src/scanOrder.css";
import { getMealType } from "utils/order";
import { MealType } from "enums/order";
import MealSelector from "./MealSelector";

interface UserDetails {
  id: string;
  name: string;
  department: string;
  designation: string;
}

const ScanOrder = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const mealOptions = Object.values(MealType);

  const [selectedMealType, setSelectedMealType] = useState<MealType>(() => {
    return getMealType(new Date().getHours());
  });

  const handleMealTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMealType(event.target.value as MealType);
  };

  const fetchUserDetails = async (scannedInfo: any) => {
    try {
      const formattedText = scannedInfo.replace(/(\w+):/g, '"$1":');
      const data = JSON.parse(formattedText);
      if (data && data.id) {
        setUserDetails({
          id: data.id,
          name: data.name,
          department: data.department,
          designation: data.designation,
        });
      }
    } catch (error) {
      console.error("Error parsing scanned data:", error);
    }
  };

  const handleOrderSubmit = async () => {
    if (!userDetails) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:5555/api/orders",
        {
          userId: userDetails.id,
          mealType: selectedMealType,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Order successfully recorded!");
      resetForm();
    } catch (error) {
      console.error("Error recording order:", error);
    }
  };

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      resetForm();
    }
  };

  const resetForm = () => {
    setScannedData(null);
    setUserDetails(null);
    setSelectedMealType(getMealType(new Date().getHours()));
    setIsScanning(false);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg tablet-max:w-1/2 tablet-max:mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Scan and Place Order
      </h1>

      <div className="scanner-container mb-6 flex flex-col items-center">
        {!isScanning && (
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mb-6 w-60 hover:bg-blue-700 transition-all ease-in-out flex items-center justify-center"
            onClick={() => setIsScanning(true)}
          >
            <div className="mr-2">
              <FaCamera />
            </div>
            Start Scanning
          </button>
        )}

        {isScanning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <QrReader
              onResult={(result: any, error) => {
                if (result?.text) {
                  const scanBox = document.querySelector(".scan-box");
                  const scanBoxRect = scanBox?.getBoundingClientRect();
                  const qrReaderRect = document
                    .querySelector(".qr-reader")
                    ?.getBoundingClientRect();

                  if (
                    scanBoxRect &&
                    qrReaderRect &&
                    scanBoxRect.left >= qrReaderRect.left &&
                    scanBoxRect.right <= qrReaderRect.right &&
                    scanBoxRect.top >= qrReaderRect.top &&
                    scanBoxRect.bottom <= qrReaderRect.bottom
                  ) {
                    setScannedData(result.text);
                    fetchUserDetails(result.text);
                    setIsScanning(false);
                  }
                }
                if (error) {
                  console.error("QR scan error:", error);
                }
              }}
              constraints={{ facingMode: "environment" }}
              className="absolute inset-0 w-full h-full qr-reader"
            />

            <div className="relative w-72 h-72 border-4 border-red-500 rounded-lg flex items-center justify-center scan-box">
              <div className="absolute w-full h-1 bg-red-500 animate-scan-line"></div>
            </div>

            <button
              className="absolute top-4 right-4 bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all ease-in-out z-50 flex items-center"
              onClick={() => setIsScanning(false)}
            >
              <div className="mr-2">
                <FaRegTimesCircle />
              </div>
              Cancel Scan
            </button>
          </div>
        )}

        {scannedData && (
          <p className="text-green-600 text-lg mt-4 font-bold">
            Scanned successfully! {scannedData}
          </p>
        )}
      </div>

      {userDetails && (
        <div className="form-container bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            User Details
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700 font-bold">
            <p>
              <strong>Id:</strong> {userDetails.id}
            </p>
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Department:</strong> {userDetails.department}
            </p>
            <p>
              <strong>Designation:</strong> {userDetails.designation}
            </p>
          </div>
          <MealSelector
            selectedMeal={selectedMealType}
            onMealChange={handleMealTypeChange}
            mealOptions={mealOptions}
          />
          <div className="time mt-6">
            <label className="block text-gray-700 text-m font-extrabold mb-2">
              Time:
            </label>
            <p className="text-gray-700 text-lg font-bold">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
          <div className="flex mt-6 gap-5 justify-end">
            <button
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all ease-in-out flex items-center"
              onClick={handleCancelOrder}
            >
              <div className="mr-2">
                <FaRegTimesCircle />
              </div>
              Cancel
            </button>
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all ease-in-out flex items-center"
              onClick={handleOrderSubmit}
            >
              <div className="mr-2">
                <FaCheckCircle />
              </div>
              Place Order
            </button>
          </div>
        </div>
      )}

      {scannedData && !userDetails && (
        <p className="text-red-500 font-semibold text-lg mt-4">
          No valid user data found in the scan.
        </p>
      )}

      <div className="flex justify-center mt-6">
        <button
          className="bg-gray-700 text-white px-6 py-3 rounded-lg w-60 hover:bg-gray-800 transition-all ease-in-out flex items-center justify-center"
          onClick={() => {
            resetForm();
            setIsScanning(true);
          }}
        >
          <div className="mr-2">
            <FaRedoAlt />
          </div>
          Scan Again
        </button>
      </div>
    </div>
  );
};

export default ScanOrder;
