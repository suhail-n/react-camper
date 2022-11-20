export const getCamps = async () => {
  const response = await fetch("/camps", { method: "GET" });
  const status = await response.status;
  if (status !== 200) {
    console.log(`failed request with status code: ${status}`);
    return [];
  }
  return response.json();
};

export const createCamp = async (
  title,
  content,
  rating,
  image,
  userId,
  token
) => {
  const payload = {
    title,
    content,
    rating,
    userId,
    image,
  };

  return fetch("/camps", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
