import { http } from "../services/http";

export const realEstatesRequest = () => {
  return http("get").get({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/real-estates`,
  });
};
