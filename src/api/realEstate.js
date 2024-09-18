import { http } from "../services/http";

export const realEstateRequest = (id) => {
  return http("get").get({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
