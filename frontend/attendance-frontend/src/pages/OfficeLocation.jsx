import { useEffect, useState } from "react";
import api from "../services/api";

function OfficeLocation() {
  const [officeName, setOfficeName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [radius, setRadius] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      console.log("========== LOAD LOCATION ==========");

      const res = await api.get("/location");

      console.log("SUCCESS");
      console.log(res.data);

      setOfficeName(res.data.office_name || "");
      setLatitude(res.data.latitude || "");
      setLongitude(res.data.longitude || "");
      setRadius(res.data.radius || "");
    } catch (err) {
      console.log("========== LOAD ERROR ==========");
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
      },
      (error) => {
        console.log(error);
        alert("Unable to get location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  };

  const saveLocation = async () => {
    if (
      !officeName ||
      !latitude ||
      !longitude ||
      !radius
    ) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      office_name: officeName,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      radius: parseInt(radius),
    };

    console.log("========== SAVE REQUEST ==========");
    console.log(payload);

    try {
      setLoading(true);

      const response = await api.put(
        "/location",
        payload
      );

      console.log("========== SUCCESS ==========");
      console.log(response);

      alert("Office Location Updated Successfully");
    } catch (err) {

      console.log("========== ERROR ==========");
      console.log(err);

      console.log("Status");
      console.log(err.response?.status);

      console.log("Response");
      console.log(err.response?.data);

      console.log("Headers");
      console.log(err.response?.headers);

      console.log("URL");
      console.log(err.config?.url);

      console.log("Method");
      console.log(err.config?.method);

      console.log("Request");
      console.log(err.request);

      console.log("Complete Response");
      console.log(err.response);

      alert(
`STATUS : ${err.response?.status}

URL : ${err.config?.url}

MESSAGE :
${JSON.stringify(err.response?.data)}

ERROR :
${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "18px",
          padding: "30px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
          }}
        >
          📍 Office Geo-Fencing
        </h2>

        <label>Office Name</label>

        <input
          type="text"
          value={officeName}
          onChange={(e) =>
            setOfficeName(e.target.value)
          }
          style={inputStyle}
        />

        <label>Latitude</label>

        <input
          type="number"
          value={latitude}
          onChange={(e) =>
            setLatitude(e.target.value)
          }
          style={inputStyle}
        />

        <label>Longitude</label>

        <input
          type="number"
          value={longitude}
          onChange={(e) =>
            setLongitude(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={getCurrentLocation}
          style={{
            marginBottom: "20px",
            width: "100%",
            padding: "12px",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📍 Use Current Location
        </button>

        <label>Geo Fence Radius (Meter)</label>

        <input
          type="number"
          value={radius}
          onChange={(e) =>
            setRadius(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={saveLocation}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "25px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loading
            ? "Saving..."
            : "💾 Save Office Location"}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default OfficeLocation;