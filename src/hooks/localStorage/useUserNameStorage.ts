import { userNameStroage } from "../../lib/localStorage";

export default function useUserNameStorage() {
  const { get, set: setUserName } = userNameStroage;
  const userName = get("name");

  return { userName, setUserName };
}
