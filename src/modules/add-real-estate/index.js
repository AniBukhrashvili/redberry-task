import { useNavigate } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import AppInput from "../../components/AppInput";
import AppButton from "../../components/AppButton";
import AppTextarea from "../../components/AppTextarea";
import AppSelect from "../../components/AppSelect";
import AppRadio from "../../components/AppRadio";

import styles from "./AddRealEstate.module.scss";

export default function AddRealEstate() {
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      label: "სოხუმი",
      region_id: 1,
    },
    {
      id: 2,
      label: "გაგრა",
      region_id: 1,
    },
    {
      id: 3,
      label: "ოჩამჩირე",
      region_id: 1,
    },
    {
      id: 4,
      label: "გუდაუთა",
      region_id: 1,
    },
  ];

  return (
    <AppLayout>
      <div className={styles.AddRealEstate}>
        <h1>ლისტინგის დამატება</h1>
        <form>
          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>გარიგების ტიპი</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppRadio checked>იყიდება</AppRadio>
              <AppRadio>ქირავდება</AppRadio>
            </div>
          </div>
          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>მდებარეობა</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppInput
                label="მისამართი"
                required
                helperText={"მინიმუმ ორი სიმბოლო"}
              ></AppInput>
              <AppInput
                label="საფოსტო ინდექსი"
                required
                helperText={"მხოლოდ რიცხვები"}
              ></AppInput>
            </div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppSelect label="რეგიონი" options={options} required></AppSelect>
              <AppSelect label="ქალაქი" options={[]} required></AppSelect>
            </div>
          </div>
          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>ბინის დეტალები</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppInput
                label="ფასი"
                required
                helperText={"მხოლოდ რიცხვები"}
              ></AppInput>
              <AppInput
                label="ფართობი"
                required
                helperText={"მხოლოდ რიცხვები"}
              ></AppInput>
            </div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppInput
                label="საძინებლების რაოდენობა"
                required
                helperText={"მხოლოდ რიცხვები"}
              ></AppInput>
            </div>
            <AppTextarea
              label="აღწერა"
              required
              helperText={"მინიმუმ ხუთი სიტყვა"}
            ></AppTextarea>
            <AppInput
              label="ატვირთეთ ფოტო"
              type="file"
              variant="dashed"
              required
            ></AppInput>
          </div>
          <div className={styles.AddRealEstate__Row}>
            <div className={styles.AddRealEstate__RowTitle}>აგენტი</div>
            <div className={styles.AddRealEstate__Wrapper}>
              <AppSelect label="აირჩიე" options={[]} required></AppSelect>
            </div>
          </div>
          <div className={styles.AddRealEstate__Actions}>
            <AppButton variant="secondary" onClick={() => navigate("/")}>
              გაუქმება
            </AppButton>
            <AppButton variant="primary" type="submit">
              დაამატე აგენტი
            </AppButton>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
