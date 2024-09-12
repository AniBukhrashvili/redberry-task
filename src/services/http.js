export const http = (method) => {
  return {
    [method]: ({ url }) =>
      fetch(url, {
        method: method.toUpperCase(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 9cfd96b8-701b-46db-8ca9-ce93c5be7427`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
  };
};
