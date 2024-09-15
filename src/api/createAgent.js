import { http } from "../services/http";

export const createAgentRequest = (formData) => {
  return http("post").post({
    url: `https://api.real-estate-manager.redberryinternship.ge/api/agents`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
