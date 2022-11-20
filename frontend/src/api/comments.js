export const getComments = async (id, expandUser = true) => {
  let url;
  if (expandUser) {
    url = `/camps/${id}/comments?_sort=createdAt&_order=desc&_expand=user`;
  } else {
    url = `/camps/${id}/comments?_sort=createdAt&_order=desc`;
  }
  const response = await fetch(url, {
    method: "GET",
  });
  const status = await response.status;
  if (status !== 200) {
    console.log(`failed status with code: ${status}`);
    return [];
  }
  const result = await response.json();
  console.log(result);
  return result;
};

export const createComment = async (campId, userId, token, comment) => {
  let url;
  url = `/camps/${campId}/comments`;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ body: comment, userId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateComment = async (commentId, comment, token) => {
  const url = `/comments/${commentId}`;
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ body: comment }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
