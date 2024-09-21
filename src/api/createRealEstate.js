import { http } from "../services/http";

export const createRealEstateRequest = (formData) => {
  return http("post").post({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
