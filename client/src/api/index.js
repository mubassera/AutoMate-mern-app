import axios from "axios";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

const API_URL = "http://localhost:5000";

export const DoLogin = async ({ name,email, password,vehicleType,vehicleBrand,vehicleModel }) => {
  try {
    const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    const response = await axios.post(`${API_URL}/user/login`, { name,email, password,vehicleType,vehicleBrand,vehicleModel },config
    );
    if (response.status === "403") {
      throw new Error("");
    }
    localStorage.setItem("userData", response.data);

    //navigate("/home");
    
    return { success: true, message: "Login successful" };
  } catch (error) {
    return { success: false, message: "Login failed" };
  }
};

export const DoSignup = async ({ name,email, password,vehicleType,vehicleBrand,vehicleModel }) => {
  try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_URL}/user/register`,
        {name,email, password,vehicleType,vehicleBrand,vehicleModel},
        config
      );
      //console.log(response);
      if (response.data == "choose your vehicle") {
        alert("Choose your vehicle");
      } else if (response.data == "User already Exists") {
        alert("User already Exists");
      } else if (response.data == "Username already Exists") {
        alert("Username already Exists");
      } else {
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/home");
      }
    } catch (error) {
      alert("Some error has occured. Please try again later");
      console.log(error);
    }
};