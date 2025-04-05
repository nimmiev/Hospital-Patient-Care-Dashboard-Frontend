import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required").max(50),
  email: yup.string().required("Email is required").email("Invalid email"),
  phone: yup.string().required("Phone is required").matches(/^\d{10}$/, "Phone number must be 10 digits"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters and include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: yup
    .string()
    .required("Please re-enter the password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup.string().oneOf(["Male", "Female", "Other"], "Invalid Gender").required("Gender is required"),
  address: yup.string().required("Address is required"),
  emergencyContact: yup.object().shape({
    name: yup.string().required("Emergency contact name is required"),
    phone: yup.string().required("Emergency contact phone is required").matches(/^\d{10}$/, "Must be a valid phone number"),
  }),
  bloodType: yup.string().oneOf(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], "Invalid Blood Type").required("Blood Type is required"),
  height: yup.number().required("Height is required").positive("Height must be positive"),
  weight: yup.number().required("Weight is required").positive("Weight must be positive"),
});

export const usePatientForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/api/admin/add-patient", data);
      console.log(response);
      toast.success("Patient added successfully!");
      reset();
      // setTimeout(() => {
      //   navigate("/admin/patients");
      // }, 1500); // wait for 1.5 seconds before navigating
    } catch (error) {
      toast.error("Error adding patient!");
      console.error("Error:", error);
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
