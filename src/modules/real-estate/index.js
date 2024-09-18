import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppLayout from "../../layout/AppLayout";
import AppButton from "../../components/AppButton";
import { realEstateRequest } from "../../api/realEstate";
import DeleteModal from "../../components/DeleteModal";

import styles from "./RealEstate.module.scss";

export default function RealEstate() {
  const { id } = useParams();
  const [realEstate, setRealEstate] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchSingleRealEstate = async (estateId) => {
    const data = await realEstateRequest(estateId);
    setRealEstate(data);
  };

  useEffect(() => {
    fetchSingleRealEstate(id);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <AppLayout>
      <div className={styles.RealEstate}>
        <div className={styles.RealEstate__Back}>
          <a href="/">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9428 26.2765C16.4221 26.7972 15.5779 26.7972 15.0572 26.2765L5.72385 16.9431C5.20315 16.4224 5.20315 15.5782 5.72385 15.0575L15.0572 5.72418C15.5779 5.20349 16.4221 5.20349 16.9428 5.72418C17.4635 6.24488 17.4635 7.0891 16.9428 7.6098L9.88561 14.667H25.3333C26.0697 14.667 26.6667 15.2639 26.6667 16.0003C26.6667 16.7367 26.0697 17.3337 25.3333 17.3337H9.88561L16.9428 24.3909C17.4635 24.9115 17.4635 25.7558 16.9428 26.2765Z"
                fill="#021526"
              />
            </svg>
          </a>
        </div>
        <div className={styles.RealEstate__Top}>
          <div className={styles.RealEstate__Figure}>
            <img src={realEstate?.image} alt="Real Estate" />
            <span className={styles.RealEstate__Badge}>
              {realEstate?.isRental ? "ქირავდება" : "იყიდება"}
            </span>
            <div className={styles.RealEstate__Date}>
              გამოქვეყნების თარიღი: {formatDate(realEstate?.created_at)}
            </div>
          </div>

          <div className={styles.RealEstate__Content}>
            <h1>{realEstate?.price} ₾</h1>
            <ul>
              <li>
                <span>
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.55527 4.95547C8.5623 1.94844 13.4377 1.94844 16.4447 4.95547C19.4517 7.96251 19.4517 12.8379 16.4447 15.8449L11 21.2896L5.55527 15.8449C2.54823 12.8379 2.54823 7.96251 5.55527 4.95547ZM11 12.6002C12.215 12.6002 13.2 11.6152 13.2 10.4002C13.2 9.18517 12.215 8.2002 11 8.2002C9.78496 8.2002 8.79999 9.18517 8.79999 10.4002C8.79999 11.6152 9.78496 12.6002 11 12.6002Z"
                      fill="#808A93"
                    />
                  </svg>
                </span>
                <p>
                  {realEstate?.city.name}, {realEstate?.address}
                </p>
              </li>
              <li>
                <span>
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="22"
                      height="22"
                      transform="translate(0 0.5)"
                      fill="white"
                    />
                    <path
                      d="M3 17.6111C3 18.1121 3.19901 18.5925 3.55324 18.9468C3.90748 19.301 4.38792 19.5 4.88889 19.5H18.1111C18.6121 19.5 19.0925 19.301 19.4468 18.9468C19.801 18.5925 20 18.1121 20 17.6111V4.38889C20 3.88792 19.801 3.40748 19.4468 3.05324C19.0925 2.69901 18.6121 2.5 18.1111 2.5H4.88889C4.38792 2.5 3.90748 2.69901 3.55324 3.05324C3.19901 3.40748 3 3.88792 3 4.38889V17.6111ZM11.5 5.33333H17.1667V11H15.2778V7.22222H11.5V5.33333ZM5.83333 11H7.72222V14.7778H11.5V16.6667H5.83333V11Z"
                      fill="#808A93"
                    />
                  </svg>
                </span>
                <p>
                  ფართი {realEstate?.area} მ<sup>2</sup>
                </p>
              </li>
              <li>
                <span>
                  <svg
                    width="22"
                    height="23"
                    viewBox="0 0 22 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5625 10.4129C18.1291 10.2226 17.6608 10.1246 17.1875 10.125H4.8125C4.3392 10.1245 3.87097 10.2224 3.4375 10.4125C2.82485 10.6804 2.30353 11.121 1.93724 11.6804C1.57096 12.2398 1.37559 12.8938 1.375 13.5625V18.375C1.375 18.5573 1.44743 18.7322 1.57636 18.8611C1.7053 18.9901 1.88016 19.0625 2.0625 19.0625C2.24484 19.0625 2.4197 18.9901 2.54864 18.8611C2.67757 18.7322 2.75 18.5573 2.75 18.375V18.0313C2.75111 17.9404 2.78769 17.8536 2.85191 17.7894C2.91614 17.7252 3.00293 17.6886 3.09375 17.6875H18.9062C18.9971 17.6886 19.0839 17.7252 19.1481 17.7894C19.2123 17.8536 19.2489 17.9404 19.25 18.0313V18.375C19.25 18.5573 19.3224 18.7322 19.4514 18.8611C19.5803 18.9901 19.7552 19.0625 19.9375 19.0625C20.1198 19.0625 20.2947 18.9901 20.4236 18.8611C20.5526 18.7322 20.625 18.5573 20.625 18.375V13.5625C20.6243 12.8939 20.4289 12.24 20.0626 11.6806C19.6964 11.1213 19.1751 10.6808 18.5625 10.4129Z"
                      fill="#808A93"
                    />
                    <path
                      d="M16.1562 3.9375H5.84375C5.20557 3.9375 4.59353 4.19102 4.14227 4.64227C3.69102 5.09353 3.4375 5.70557 3.4375 6.34375V9.4375C3.43752 9.46413 3.44373 9.4904 3.45564 9.51422C3.46755 9.53805 3.48483 9.55878 3.50612 9.57478C3.52741 9.59078 3.55213 9.60161 3.57833 9.60642C3.60453 9.61123 3.63148 9.60989 3.65707 9.6025C4.03238 9.49273 4.42146 9.43717 4.8125 9.4375H4.99426C5.03668 9.43777 5.07771 9.42234 5.10944 9.39418C5.14117 9.36602 5.16136 9.32712 5.16613 9.28496C5.20363 8.94903 5.36356 8.63868 5.61537 8.41318C5.86718 8.18768 6.19323 8.06284 6.53125 8.0625H8.9375C9.27574 8.06253 9.60211 8.18722 9.85419 8.41275C10.1063 8.63828 10.2664 8.94881 10.3039 9.28496C10.3087 9.32712 10.3289 9.36602 10.3606 9.39418C10.3923 9.42234 10.4334 9.43777 10.4758 9.4375H11.5268C11.5692 9.43777 11.6102 9.42234 11.642 9.39418C11.6737 9.36602 11.6939 9.32712 11.6987 9.28496C11.7361 8.94925 11.8959 8.63908 12.1474 8.41361C12.399 8.18814 12.7247 8.06316 13.0625 8.0625H15.4688C15.807 8.06253 16.1334 8.18722 16.3854 8.41275C16.6375 8.63828 16.7976 8.94881 16.8352 9.28496C16.8399 9.32712 16.8601 9.36602 16.8919 9.39418C16.9236 9.42234 16.9646 9.43777 17.007 9.4375H17.1875C17.5786 9.43731 17.9676 9.49302 18.3429 9.60293C18.3686 9.61033 18.3955 9.61167 18.4218 9.60683C18.448 9.602 18.4727 9.59113 18.4941 9.57508C18.5154 9.55903 18.5326 9.53824 18.5445 9.51436C18.5564 9.49049 18.5625 9.46417 18.5625 9.4375V6.34375C18.5625 5.70557 18.309 5.09353 17.8577 4.64227C17.4065 4.19102 16.7944 3.9375 16.1562 3.9375Z"
                      fill="#808A93"
                    />
                  </svg>
                </span>
                <p>საძინებელი {realEstate?.bedrooms}</p>
              </li>
              <li>
                <span>
                  <svg
                    width="18"
                    height="21"
                    viewBox="0 0 18 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.89431 0.394496C7.65904 0.64712 7.52683 0.989776 7.52676 1.34709V4.83142H1.25446C0.921756 4.83142 0.602679 4.97338 0.367423 5.22606C0.132166 5.47874 0 5.82146 0 6.1788V11.5683C0 11.9257 0.132166 12.2684 0.367423 12.5211C0.602679 12.7738 0.921756 12.9157 1.25446 12.9157H7.52676V21H10.0357V12.9157H14.4664C14.6503 12.9156 14.8319 12.8722 14.9984 12.7883C15.1649 12.7045 15.3122 12.5824 15.4298 12.4307L17.8547 9.30473C17.9486 9.18368 18 9.03111 18 8.87357C18 8.71602 17.9486 8.56346 17.8547 8.4424L15.4298 5.31648C15.3122 5.16473 15.1649 5.04263 14.9984 4.95881C14.8319 4.87498 14.6503 4.8315 14.4664 4.83142H10.0357V1.34709C10.0356 1.08065 9.96202 0.820203 9.82417 0.59868C9.68633 0.377157 9.49043 0.204504 9.26124 0.102548C9.03205 0.000591374 8.77986 -0.0260908 8.53656 0.0258744C8.29325 0.0778397 8.06975 0.206119 7.89431 0.394496Z"
                      fill="#021526"
                      fillOpacity="0.5"
                    />
                  </svg>
                </span>
                <p>საფოსტო ინდექსი {realEstate?.zip_code}</p>
              </li>
            </ul>

            <div className={styles.RealEstate__Desc}>
              {realEstate?.description}
            </div>

            <div className={styles.RealEstate__Agent}>
              <div className={styles.RealEstate__AgentTop}>
                <img src={realEstate?.agent.avatar} alt="Agent Avatar" />
                <div className={styles.RealEstate__Name}>
                  <h3>
                    {realEstate?.agent.name} {realEstate?.agent.surname}
                  </h3>
                  <p>აგენტი</p>
                </div>
              </div>

              <div className={styles.RealEstate__AgentBottom}>
                <a href={`mailto:${realEstate?.agent.email}`}>
                  <span>
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.84341e-05 2.15414C-1.95112e-05 2.16127 -3.14003e-05 2.16839 6.24258e-05 2.17551V10.8333C6.24258e-05 12.0266 0.980211 13 2.18186 13H13.8181C15.0198 13 15.9999 12.0266 15.9999 10.8333V2.1756C16 2.16841 16 2.16122 15.9999 2.15404C15.993 0.966489 15.0155 0 13.8181 0H2.18186C0.984418 0 0.00692812 0.966547 9.84341e-05 2.15414ZM1.53211 1.84452C1.65238 1.60833 1.89971 1.44444 2.18186 1.44444H13.8181C14.1003 1.44444 14.3476 1.60833 14.4679 1.84452L8 6.34064L1.53211 1.84452ZM14.5454 3.55381V10.8333C14.5454 11.2289 14.2165 11.5556 13.8181 11.5556H2.18186C1.78353 11.5556 1.4546 11.2289 1.4546 10.8333V3.55381L7.58294 7.81389C7.83335 7.98796 8.16665 7.98796 8.41706 7.81389L14.5454 3.55381Z"
                        fill="#808A93"
                      />
                    </svg>
                  </span>
                  {realEstate?.agent.email}
                </a>

                <a href={`tel:${realEstate?.agent.phone}`}>
                  <span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.08632 3.45996C9.69678 3.57906 10.2578 3.87762 10.6976 4.31742C11.1374 4.75722 11.436 5.31825 11.5551 5.92871M9.08632 0.959961C10.3546 1.10086 11.5373 1.66882 12.4402 2.57059C13.3431 3.47236 13.9126 4.65434 14.0551 5.92246M13.4301 10.91V12.785C13.4308 12.959 13.3951 13.1313 13.3254 13.2908C13.2557 13.4503 13.1534 13.5935 13.0251 13.7111C12.8969 13.8288 12.7454 13.9184 12.5805 13.9742C12.4157 14.0299 12.2409 14.0506 12.0676 14.035C10.1443 13.826 8.29695 13.1688 6.67382 12.1162C5.16372 11.1566 3.88341 9.87632 2.92382 8.36621C1.86756 6.73571 1.21022 4.87933 1.00507 2.94746C0.989455 2.77463 1.00999 2.60044 1.06539 2.43598C1.12078 2.27152 1.2098 2.12039 1.3268 1.99222C1.4438 1.86406 1.5862 1.76165 1.74494 1.69154C1.90368 1.62142 2.07529 1.58512 2.24882 1.58496H4.12382C4.42714 1.58198 4.72119 1.68939 4.95117 1.88717C5.18116 2.08495 5.33137 2.35962 5.37382 2.65996C5.45296 3.26 5.59973 3.84917 5.81132 4.41621C5.89541 4.63991 5.91361 4.88303 5.86376 5.11676C5.81392 5.35049 5.69811 5.56503 5.53007 5.73496L4.73632 6.52871C5.62605 8.09343 6.92161 9.38899 8.48632 10.2787L9.28007 9.48496C9.45 9.31692 9.66454 9.20112 9.89827 9.15127C10.132 9.10142 10.3751 9.11962 10.5988 9.20371C11.1659 9.41531 11.755 9.56207 12.3551 9.64121C12.6587 9.68404 12.9359 9.83697 13.1342 10.0709C13.3324 10.3048 13.4377 10.6034 13.4301 10.91Z"
                        stroke="#808A93"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {realEstate?.agent.phone}
                </a>
              </div>
            </div>
            <AppButton variant="dark" onClick={() => setShowDeleteModal(true)}>
              ლისტინგის წაშლა
            </AppButton>
          </div>
        </div>
        {showDeleteModal && (
          <DeleteModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}
      </div>
    </AppLayout>
  );
}
