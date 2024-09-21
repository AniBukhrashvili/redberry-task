import { http } from "../services/http";

export const regionsRequest = (id) => {
  return http("get").get({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/regions`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
