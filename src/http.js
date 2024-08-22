const API_URL =
  'https://port-0-comfort-server-m010bhal948caa02.sel4.cloudtype.app';

export async function fetchCreateComment(nickname, password, text) {
  const res = await fetch(`${API_URL}/comment`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      nickname,
      password,
      text,
    }),
  });
  const data = await res.json();
  return data;
}

export async function fetchGetComments() {
  const res = await fetch(`${API_URL}/comments`);
  const data = await res.json();
  return data;
}
