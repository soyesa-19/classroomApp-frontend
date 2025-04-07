import { RemoveIndexSignature } from "../types/common";

export function getConfigs(): ImportMetaEnv;
export function getConfigs(
  key: keyof RemoveIndexSignature<ImportMetaEnv>
): string | boolean;
export function getConfigs(
  key?: keyof RemoveIndexSignature<ImportMetaEnv>
): string | boolean | ImportMetaEnv {
  if (!key) {
    return import.meta.env;
  }
  return import.meta.env[key];
}
