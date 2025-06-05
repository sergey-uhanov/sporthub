export enum AppLayoutsEnum {
  default = "default",
  user = "user",
  creator = "creator",
  error = "error",
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: "AppLayoutDefault.vue",
  user: "UserLayout.vue",
  creator: "CreatorLayout.vue",
  error: "AppLayoutError.vue",
};
