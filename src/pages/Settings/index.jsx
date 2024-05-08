/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
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
      <UpdateSettings />
      <AditionalConfig />
    </>
  );
}
