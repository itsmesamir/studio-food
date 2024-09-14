import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { QrReader } from "react-qr-reader";
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

  const resetForm = () => {
    setScannedData(null);
    setUserDetails(null);
    setSelectedMealType(getMealType(new Date().getHours()));
    setIsScanning(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Scan and Place Food Order
      </h1>

      <div className="scanner-container mb-4">
        {!isScanning && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => setIsScanning(true)}
          >
            Start Scanning
          </button>
        )}

        {isScanning && (
          <QrReader
            onResult={(result: any, error) => {
              if (result?.text) {
                setScannedData(result.text);
                fetchUserDetails(result.text);
                setIsScanning(false);
              }
              if (error) {
                console.error("QR scan error:", error);
              }
            }}
            constraints={{ facingMode: "environment" }}
          />
        )}

        {scannedData && (
          <p className="text-green-600">Scanned successfully! {scannedData}</p>
        )}
      </div>

      {userDetails && (
        <div className="form-container bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4">User Details</h2>
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
          <p>
            <strong>MealType:</strong> {selectedMealType}
          </p>

          <MealSelector
            selectedMeal={selectedMealType}
            onMealChange={handleMealTypeChange}
            mealOptions={mealOptions}
          />

          <button
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleOrderSubmit}
          >
            Place Order
          </button>
        </div>
      )}

      {scannedData && !userDetails && (
        <p className="text-red-500">No valid user data found in the scan.</p>
      )}

      <button
        className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => {
          resetForm();
          setIsScanning(true);
        }}
      >
        Scan Again
      </button>
    </div>
  );
};

export default ScanOrder;
