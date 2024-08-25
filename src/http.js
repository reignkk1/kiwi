const API_URL = 'http://localhost:8080';

/*
server API_URL = https://port-0-comfort-server-m010bhal948caa02.sel4.cloudtype.app
dev API_URL = http://localhost:8080
*/

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

export async function fetchDeleteComment(id, password) {
  const res = await fetch(`${API_URL}/comment/${id}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({password}),
  });
  const data = await res.text();
  return data;
}
