import { useState } from "react";
import * as Yup from "yup";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import AppModal from "../AppModal";
import AppModalActions from "../AppModal/AppModalActions";
import AppModalContent from "../AppModal/AppModalContent";
import AppModalHeader from "../AppModal/AppModalHeader";
import { createAgentRequest } from "../../api/createAgent";

import styles from "./AddAgentModal.module.scss";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .required("სახელი აუცილებელია"),
  surname: Yup.string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .required("გვარი აუცილებელია"),
  email: Yup.string()
    .matches(/@redberry\.ge$/, "გამოიყენეთ @redberry.ge ფოსტა")
    .required("ელ-ფოსტა აუცილებელია"),
  phone: Yup.string()
    .matches(/^5\d{8}$/, "მხოლოდ რიცხვები")
    .required("ტელეფონის ნომერი აუცილებელია"),
  avatar: Yup.mixed()
    .required("ფოტოს ატვირთვა აუცილებელია")
    .test(
      "fileType",
      "მხოლოდ სურათის ფაილებია დასაშვები (JPEG, PNG, GIF, JPG)",
      (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(
            value.type
          )
        );
      }
    )
    .test("fileSize", "ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს", (value) => {
      return value && value.size <= 1024 * 1024;
    }),
});

export default function AddAgentModal({ showAgentModal, setShowAgentModal }) {
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    if (name === "avatar") {
      const file = value;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(form, { abortEarly: false });
      return true;
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("surname", form.surname);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("avatar", form.avatar);

    try {
      await createAgentRequest(formData);
      setShowAgentModal(false);
    } catch (error) {
      console.error("Error creating agent:", error);
    }
  };

  return (
    <AppModal
      isVisible={showAgentModal}
      onChange={() => setShowAgentModal(!showAgentModal)}
      className={styles.AddAgentModal}
    >
      <AppModalHeader>აგენტის დამატება</AppModalHeader>
      <AppModalContent>
        <form onSubmit={onSubmit}>
          <div className={styles.AddAgentModal__Row}>
            <AppInput
              label="სახელი"
              name="name"
              value={form.name}
              onChange={(data) => handleChange("name", data.target.value)}
              helperText={"მინიმუმ ორი სიმბოლო"}
              error={errors.name}
            />
            <AppInput
              label="გვარი"
              name="surname"
              value={form.surname}
              onChange={(data) => handleChange("surname", data.target.value)}
              helperText={"მინიმუმ ორი სიმბოლო"}
              error={errors.surname}
            />
          </div>
          <div className={styles.AddAgentModal__Row}>
            <AppInput
              label="ელ-ფოსტა"
              name="email"
              value={form.email}
              onChange={(data) => handleChange("email", data.target.value)}
              helperText={"გამოიყენეთ @redberry.ge ფოსტა"}
              error={errors.email}
            />
            <AppInput
              label="ტელეფონის ნომერი"
              type="number"
              name="phone"
              value={form.phone}
              onChange={(data) => handleChange("phone", data.target.value)}
              helperText={"მხოლოდ რიცხვები"}
              error={errors.phone}
            />
          </div>
          <div className={styles.AddAgentModal__FileRow}>
            <AppInput
              type="file"
              label="ატვირთეთ ფოტო"
              name="avatar"
              preview={preview}
              onChange={(data) => handleChange("avatar", data.target.files[0])}
              helperText={errors.avatar}
              error={errors.avatar}
              variant="dashed"
            />
          </div>
        </form>
      </AppModalContent>
      <AppModalActions>
        <AppButton variant="secondary" onClick={() => setShowAgentModal(false)}>
          გაუქმება
        </AppButton>
        <AppButton variant="primary" type="submit" onClick={onSubmit}>
          დაამატე აგენტი
        </AppButton>
      </AppModalActions>
    </AppModal>
  );
}
