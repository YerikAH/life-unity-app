import {
  AditionalConfig,
  UpdateSettings,
} from "../../components/Settings";
import { useTitle } from "../../hooks";

export function Settings() {
  useTitle("Settings - LifeUnity")

  return (
    <>
      <UpdateSettings />
      <AditionalConfig />
    </>
  );
}
