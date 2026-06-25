import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [mobile, setMobile] =
    useState(
      window.innerWidth <= 768
    );

  useEffect(() => {
    const handleResize = () => {
      setMobile(
        window.innerWidth <=
          768
      );

      if (
        window.innerWidth > 768
      ) {
        setSidebarOpen(
          false
        );
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Mobile Overlay */}
      {mobile &&
        sidebarOpen && (
          <div
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
            style={{
              position:
                "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          />
        )}

      {/* Sidebar */}
      <Sidebar
        mobile={mobile}
        sidebarOpen={
          sidebarOpen
        }
        setSidebarOpen={
          setSidebarOpen
        }
      />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          background:
            "#f5f7fb",
          minHeight:
            "100vh",
        }}
      >
        {/* Mobile Header */}
        {mobile && (
          <div
            style={{
              height: "65px",
              background:
                "#ffffff",
              display:
                "flex",
              alignItems:
                "center",
              padding:
                "0 20px",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <button
              onClick={() =>
                setSidebarOpen(
                  true
                )
              }
              style={{
                border:
                  "none",
                background:
                  "transparent",
                fontSize:
                  "28px",
                cursor:
                  "pointer",
              }}
            >
              ☰
            </button>

            <h3
              style={{
                marginLeft:
                  "20px",
              }}
            >
              Attendance
            </h3>
          </div>
        )}

        <div
          style={{
            padding:
              mobile
                ? "20px"
                : "30px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;