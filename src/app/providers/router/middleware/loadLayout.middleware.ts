import type { RouteLocationNormalized } from "vue-router";
import { AppLayoutsEnum, AppLayoutToFileMap } from "@/widgets/layouts";

export async function loadLayoutMiddleware(to: RouteLocationNormalized): Promise<void> {
    const { layout } = to.meta;
    const normalizedLayoutName = layout || AppLayoutsEnum.default;
    const fileName = AppLayoutToFileMap[normalizedLayoutName];

    const fileNameWithoutExtension = fileName.split(".vue")[0];
    console.log(fileNameWithoutExtension)
    const component = await import(`@/widgets/layouts/ui/${fileNameWithoutExtension}.vue`);
    to.meta.layoutComponent = component.default;
}
