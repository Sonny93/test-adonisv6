export const makeRequest = async ({
  url,
  headers,
  body,
  method = 'GET',
}: Omit<RequestInit, 'body'> & { url: string; body?: any }) => {
  return await fetch(url, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
