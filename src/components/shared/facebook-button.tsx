// import { Button } from "@/components/ui/button";
// import { useTranslations } from "next-intl";
// import Image from "next/image";

// export default function FacebookLoginButton(className?: string) {
//     const t = useTranslations();
//   return (
//     <Button
//       variant="outline"
//       className="flex gap-2  border-slate-200 dark:border-slate-700 
//                  text-slate-700 dark:text-slate-200 
//                  hover:border-slate-400 dark:hover:border-slate-500 
//                  hover:text-slate-900 dark:hover:text-slate-300 
//                  transition duration-150 w-fit"
//                  className={className}
//     >
//       <Image src="/images/2023_Facebook_icon.svg.png" alt="facebook logo" width={24} height={24} />
//       <span>{t("signInWithFacebook")}</span>
//     </Button>
//   );
// }
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  className?: string;
}

export default function FacebookLoginButton({ className }: Props) {
  const t = useTranslations();

  return (
    <Button
      variant="outline"
      className={`flex gap-2 border-slate-200 dark:border-slate-700 
                  text-slate-700 dark:text-slate-200 
                  hover:border-slate-400 dark:hover:border-slate-500 
                  hover:text-slate-900 dark:hover:text-slate-300 
                  transition duration-150 w-fit ${className}`}
    >
      <Image
        src="/images/2023_Facebook_icon.svg.png"
        alt="facebook logo"
        width={24}
        height={24}
      />
      <span>{t("signInWithFacebook")}</span>
    </Button>
  );
}
