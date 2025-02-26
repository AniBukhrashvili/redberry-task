import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { realEstatesRequest } from "../../api/realEstates";
import AppButton from "../../components/AppButton";
import AppLayout from "../../layout/AppLayout";
import AppRealEstateCard from "../../components/AppRealEstateCard";
import AddAgentModal from "../../components/AddAgentModal";

import styles from "./RealEstates.module.scss";

export default function RealEstates() {
  const [realEstates, setRealEstates] = useState([]);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const navigate = useNavigate();

  const fetchRealEstates = async () => {
    const data = await realEstatesRequest();
    setRealEstates(data);
  };

  useEffect(() => {
    fetchRealEstates();
  }, []);

  return (
    <AppLayout>
      <div className={styles.RealEstates}>
        <div className={styles.RealEstates__Top}>
          <div className={styles.RealEstates__Filter}>
            {/* filters
            <div className={styles.RealEstates__Tags}>tags</div> */}
          </div>
          <div className={styles.RealEstates__Actions}>
            <AppButton
              variant="primary"
              onClick={() => navigate("/add-real-estate")}
              prefix={
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4997 12.4144H11.9163V16.9977C11.9163 17.2408 11.8198 17.474 11.6479 17.6459C11.4759 17.8178 11.2428 17.9144 10.9997 17.9144C10.7566 17.9144 10.5234 17.8178 10.3515 17.6459C10.1796 17.474 10.083 17.2408 10.083 16.9977V12.4144H5.49967C5.25656 12.4144 5.0234 12.3178 4.85149 12.1459C4.67959 11.974 4.58301 11.7408 4.58301 11.4977C4.58301 11.2546 4.67959 11.0214 4.85149 10.8495C5.0234 10.6776 5.25656 10.5811 5.49967 10.5811H10.083V5.99772C10.083 5.75461 10.1796 5.52145 10.3515 5.34954C10.5234 5.17763 10.7566 5.08105 10.9997 5.08105C11.2428 5.08105 11.4759 5.17763 11.6479 5.34954C11.8198 5.52145 11.9163 5.75461 11.9163 5.99772V10.5811H16.4997C16.7428 10.5811 16.9759 10.6776 17.1479 10.8495C17.3198 11.0214 17.4163 11.2546 17.4163 11.4977C17.4163 11.7408 17.3198 11.974 17.1479 12.1459C16.9759 12.3178 16.7428 12.4144 16.4997 12.4144Z"
                    fill="white"
                  />
                </svg>
              }
            >
              ლისტინგის დამატება
            </AppButton>
            <AppButton
              variant="secondary"
              onClick={() => setShowAgentModal(true)}
              prefix={
                <svg
                  width="22"
                  height="23"
                  viewBox="0 0 22 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4997 12.4144H11.9163V16.9977C11.9163 17.2408 11.8198 17.474 11.6479 17.6459C11.4759 17.8178 11.2428 17.9144 10.9997 17.9144C10.7566 17.9144 10.5234 17.8178 10.3515 17.6459C10.1796 17.474 10.083 17.2408 10.083 16.9977V12.4144H5.49967C5.25656 12.4144 5.0234 12.3178 4.85149 12.1459C4.67959 11.974 4.58301 11.7408 4.58301 11.4977C4.58301 11.2546 4.67959 11.0214 4.85149 10.8495C5.0234 10.6776 5.25656 10.5811 5.49967 10.5811H10.083V5.99772C10.083 5.75461 10.1796 5.52145 10.3515 5.34954C10.5234 5.17763 10.7566 5.08105 10.9997 5.08105C11.2428 5.08105 11.4759 5.17763 11.6479 5.34954C11.8198 5.52145 11.9163 5.75461 11.9163 5.99772V10.5811H16.4997C16.7428 10.5811 16.9759 10.6776 17.1479 10.8495C17.3198 11.0214 17.4163 11.2546 17.4163 11.4977C17.4163 11.7408 17.3198 11.974 17.1479 12.1459C16.9759 12.3178 16.7428 12.4144 16.4997 12.4144Z"
                    fill="currentColor"
                  />
                </svg>
              }
            >
              აგენტის დამატება
            </AppButton>
          </div>
        </div>
        {realEstates.length === 0 ? (
          <p>აღნიშნული მონაცემებით განცხადება არ იძებნება</p>
        ) : (
          <div className={styles.RealEstates__Listing}>
            {realEstates.map((item, index) => (
              <div key={index}>
                <AppRealEstateCard item={item} />
              </div>
            ))}
          </div>
        )}
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
