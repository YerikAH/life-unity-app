import {
  AditionalConfig,
  UpdateSettings,
} from "../../components/Settings";
import { useTitle } from "../../hooks";

export function Settings() {
  useTitle("Settings - LifeUnity")

  return (
    <div className="pb-24 md:pb-0">
      <UpdateSettings />
      <AditionalConfig />
    </div>
  );
}
