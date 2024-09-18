import { http } from "../services/http";

export const deleteRealEstateRequest = (id) => {
  return http("delete").delete({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
