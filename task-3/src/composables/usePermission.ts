import { reactive } from "vue";

export type Permission = string;

interface PermissionState {
  userPermissions: Permission[];
}

const state: PermissionState = reactive({
  userPermissions: []
});

export function setUserPermissions(permissions: Permission[]): void {
  state.userPermissions = permissions;
}

export function usePermission() {
  const can = (permissionName: Permission): boolean => {
    return state.userPermissions.includes(permissionName);
  };

  const canAny = (list: Permission[]): boolean => {
    return list.some((p) => state.userPermissions.includes(p));
  };

  const canAll = (list: Permission[]): boolean => {
    return list.every((p) => state.userPermissions.includes(p));
  };

  return {
    can,
    canAny,
    canAll
  };
}
