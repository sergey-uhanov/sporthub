import type { VueElement } from "vue";
import type { AppLayoutsEnum } from "@/widgets/layouts/model/layouts.types.ts";

declare module "vue-router" {
  interface RouteMeta {
    layout?: AppLayoutsEnum;
    layoutComponent?: VueElement;
  }
}


