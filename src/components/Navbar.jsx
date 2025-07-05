import React, { useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import Grid from "@mui/material/Grid";

const Navbar = ({ onSearch }) => {
  const [searchCity, setSearchCity] = useState("");

const handleSearchClick=()=>{
    if(searchCity.trim()){
        onSearch(searchCity);
    }
}
  return (
    <nav className=" shadow-md">
      <div className="container mx-auto py-3 px-6">
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          {/* Logo Section */}
          <Grid item>
            <div className="flex items-center gap-2">
              <TiWeatherPartlySunny fontSize="x-large" style={{ color: "#4B5550" }} />
              <p className="font-bold text-xl text-[#4B5550]">CityWeather</p>
            </div>
          </Grid>

          {/* Search Section */}
          <Grid item xs={12} sm={8} md={6} lg={5}>
            <div className="flex gap-2">
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Search city"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                InputProps={{
                  style: {
                    borderRadius: "25px",
                    backgroundColor: "#f9f9f9",
                  },
                }}
              />
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FDA4AF",
                  color: "black",
                  borderRadius: "25px",
                  padding: "0.5rem 1.5rem",
                }}
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </div>
          </Grid>

          {/* Current Location Button */}
          <Grid item>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FDA4AF",
                color: "black",
                borderRadius: "25px",
                padding: "0.5rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
              startIcon={<GpsFixedIcon />}
              onClick={() => alert("Fetching current location...")}
            >
              Current Location
            </Button>
          </Grid>
        </Grid>
      </div>
    </nav>
  );
};

export default Navbar;
