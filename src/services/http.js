export const http = (method) => {
  return {
    [method]: ({ url, data }) =>
      fetch(url, {
        method: method.toUpperCase(),
        headers: {
          Authorization: `Bearer 9cfd96b8-701b-46db-8ca9-ce93c5be7427`,
        },
        body: data,
      }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      }),
  };
};
