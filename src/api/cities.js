import { http } from "../services/http";

export const citiesRequest = (id) => {
  return http("get").get({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/cities`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
