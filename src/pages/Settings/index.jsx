import { useEffect } from "react";
import {
  SettingsHeader,
  AditionalConfig,
  UpdateSettings,
} from "../../components/Settings";
import { useTitle } from "../../hooks";

export function Settings() {
  const { changeTitle } = useTitle()

  useEffect(() => {
    changeTitle("Settings - LifeUnity")
  }, [])

  return (
    <>
      <SettingsHeader />
      <UpdateSettings />
      <AditionalConfig />
    </>
  );
}
