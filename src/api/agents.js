import { http } from "../services/http";

export const agentsRequest = (id) => {
  return http("get").get({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
