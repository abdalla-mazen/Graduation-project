import { useTranslations } from "next-intl";
import z from "zod";

// Forget Schema
export const useChooseTrackSchema  = () => {
  // Translation
  const t = useTranslations();

  // Schema
  return z.object({
   
      track: z.string().nonempty(t("track-req")),
      level: z.string()
  })
};
// type  Forget Schema
export type ChooseTrackValues = z.infer<ReturnType<typeof useChooseTrackSchema>>;