import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import AppLayout from "../../layout/AppLayout";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AppTextarea from "../../components/AppTextarea";
import AppSelect from "../../components/AppSelect";
import AppRadio from "../../components/AppRadio";
import { citiesRequest } from "../../api/cities";
import { regionsRequest } from "../../api/regions";
import { agentsRequest } from "../../api/agents";
import { createRealEstateRequest } from "../../api/createRealEstate";
import AddAgentModal from "../../components/AddAgentModal";

import styles from "./AddRealEstate.module.scss";

const validationSchema = Yup.object().shape({
  is_rental: Yup.number()
    .required("გარიგების ტიპის არჩევა აუცილებელია")
    .nullable(),
  address: Yup.string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .required("მისამართი აუცილებელია"),
  zip_code: Yup.string()
    .matches(/^\d+$/, "მხოლოდ რიცხვები")
    .required("საფოსტო ინდექსი აუცილებელია"),
  region_id: Yup.number().required("რეგიონის არჩევა აუცილებელია"),
  city_id: Yup.number().required("ქალაქის არჩევა აუცილებელია"),
  price: Yup.number()
    .typeError("ფასი უნდა იყოს რიცხვი")
    .required("ფასი აუცილებელია"),
  area: Yup.number()
    .typeError("ფართობი უნდა იყოს რიცხვი")
    .required("ფართობი აუცილებელია"),
  bedrooms: Yup.number()
    .typeError("საძინებლების რაოდენობა უნდა იყოს რიცხვი")
    .required("საძინებლების რაოდენობა აუცილებელია"),
  description: Yup.string()
    .min(5, "მინიმუმ ხუთი სიტყვა")
    .required("აღწერა აუცილებელია"),
  image: Yup.mixed()
    .required("ფოტოს ატვირთვა აუცილებელია")
    .test(
      "fileType",
      "მხოლოდ სურათის ფაილებია დასაშვები (JPEG, PNG, GIF)",
      (value) =>
        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    )
    .test(
      "fileSize",
      "ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს",
      (value) => value && value.size <= 1024 * 1024
    ),
  agent_id: Yup.number().required("აგენტის არჩევა აუცილებელია"),
});

export default function AddRealEstate() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [form, setForm] = useState({
    is_rental: null,
    address: "",
    zip_code: "",
    region_id: null,
    city_id: null,
    price: "",
    area: "",
    bedrooms: "",
    description: "",
    image: null,
    agent_id: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    if (name === "image") {
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

    const isValid = validateForm();
    if (!isValid) return;

    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value);
    }

    try {
      await createRealEstateRequest(formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating real estate:", error);
    }
  };

  const fetchCities = async () => {
    const data = await citiesRequest();
    setCities(data);
  };

  const fetchRegions = async () => {
    const data = await regionsRequest();
    setRegions(data);
  };

  const fetchAgents = async () => {
    const data = await agentsRequest();
    setAgents(data);
  };

  useEffect(() => {
    fetchCities();
    fetchRegions();
    fetchAgents();
  }, []);

  const _onSelect = (name, value) => {
    handleChange(name, value);
  };

  return (
    <AppLayout>
      <div className={styles.AddRealEstate}>
        <h1>ლისტინგის დამატება</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>გარიგების ტიპი</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppRadio
                name="is_rental"
                value={0}
                checked={form.is_rental === 0}
                onChange={() => handleChange("is_rental", 0)}
              >
                იყიდება
              </AppRadio>
              <AppRadio
                name="is_rental"
                value={1}
                checked={form.is_rental === 1}
                onChange={() => handleChange("is_rental", 1)}
              >
                ქირავდება
              </AppRadio>
            </div>
          </div>

          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>მდებარეობა</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppInput
                name="address"
                value={form.address}
                label="მისამართი"
                required
                onChange={(data) => handleChange("address", data.target.value)}
                helperText={"მინიმუმ ორი სიმბოლო"}
                error={errors.address}
              />
              <AppInput
                name="zip_code"
                label="საფოსტო ინდექსი"
                required
                value={form.zip_code}
                onChange={(data) => handleChange("zip_code", data.target.value)}
                helperText={"მხოლოდ რიცხვები"}
                error={errors.zip_code}
              />
            </div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppSelect
                name="region_id"
                label="რეგიონი"
                required
                options={regions}
                value={form.region_id}
                onSelect={(value) => _onSelect("region_id", value)}
                helperText={errors.region_id}
                error={errors.region_id}
              />
              <AppSelect
                name="city_id"
                label="ქალაქი"
                required
                options={cities}
                value={form.city_id}
                onSelect={(value) => _onSelect("city_id", value)}
                helperText={errors.city_id}
                error={errors.city_id}
              />
            </div>
          </div>

          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>ბინის დეტალები</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppInput
                name="price"
                label="ფასი"
                required
                value={form.price}
                onChange={(data) => handleChange("price", data.target.value)}
                helperText={"მხოლოდ რიცხვები"}
                error={errors.price}
              />
              <AppInput
                name="area"
                label="ფართობი"
                required
                value={form.area}
                onChange={(data) => handleChange("area", data.target.value)}
                helperText={"მხოლოდ რიცხვები"}
                error={errors.area}
              />
            </div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppInput
                name="bedrooms"
                label="საძინებლების რაოდენობა"
                required
                value={form.bedrooms}
                onChange={(data) => handleChange("bedrooms", data.target.value)}
                helperText={"მხოლოდ რიცხვები"}
                error={errors.bedrooms}
              />
            </div>
            <AppTextarea
              name="description"
              label="აღწერა"
              required
              value={form.description}
              onChange={(data) =>
                handleChange("description", data.target.value)
              }
              helperText={"მინიმუმ ხუთი სიტყვა"}
              error={errors.description}
            />
            <AppInput
              name="image"
              label="ატვირთეთ ფოტო"
              type="file"
              variant="dashed"
              required
              preview={preview}
              onChange={(data) => handleChange("image", data.target.files[0])}
              error={errors.image}
              helperText={errors.image}
            />
          </div>

          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>აგენტი</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppSelect
                name="agent_id"
                label="აირჩიე"
                required
                options={agents}
                value={form.agent_id}
                onSelect={(value) => _onSelect("agent_id", value)}
                error={errors.agent_id}
                agentClick={() => setShowAgentModal(true)}
                helperText={errors.agent_id}
              />
            </div>
          </div>

          <div className={styles.AddRealEstate__Actions}>
            <AppButton variant="secondary" onClick={() => navigate("/")}>
              გაუქმება
            </AppButton>
            <AppButton variant="primary" type="submit" onClick={onSubmit}>
              დაამატე ლისტინგი
            </AppButton>
          </div>
        </form>
      </div>
      {showAgentModal && (
        <AddAgentModal
          showAgentModal={showAgentModal}
          setShowAgentModal={setShowAgentModal}
        />
      )}
    </AppLayout>
  );
}
