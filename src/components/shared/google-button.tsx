// import { Button } from "@/components/ui/button";
// import { useTranslations } from "next-intl";
// import Image from "next/image";

// interface Props {
//   className?: string;
// }

// export default function GoogleSignInButton({ className }: Props) {
//   const t = useTranslations();
//   return (
//     <div className="flex items-center justify-center  dark:bg-gray-800">
//       <Button
//         variant="outline"
//         className={`flex gap-2 border-slate-200 dark:border-slate-700
//                    text-slate-700 dark:text-slate-200
//                    hover:border-slate-400 dark:hover:border-slate-500
//                    hover:text-slate-900 dark:hover:text-slate-300
//                    transition duration-150 ${className}`}
//       >
//         <Image src="/images/google-color.svg" alt="google logo" width={24} height={24} />
//         <span>{t("signInWithGoogle")}</span>
//       </Button>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface Props {
  className?: string;
}

export default function GoogleSignInButton({ className }: Props) {
  const t = useTranslations();

  return (
    <Button
      variant="outline"
      className={`flex gap-2 border-slate-200 dark:border-slate-700
                  text-slate-700 dark:text-slate-200
                  hover:border-slate-400 dark:hover:border-slate-500
                  hover:text-slate-900 dark:hover:text-slate-300 dark:bg-black
                  transition duration-150 w-fit ${className}`}
    >
      <Image
        src="/images/google-color.svg"
        alt="google logo"
        width={24}
        height={24}
      />
      <span>{t("signInWithGoogle")}</span>
    </Button>
  );
}
