import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import createCvAction from "../_actions/create-cv.action";

export default function useCvGeneration() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const { error, isPending, mutate } = useMutation({
    mutationFn: async () => {
      const { base64, contentType } = await createCvAction();

      // convert base64 to binary data
      const byteCharacters = atob(base64);

      // convert each character of the binary string into its ASCII byte value
      //  byteNumbers = [80, 68, 70]
      const byteNumbers = Array.from(byteCharacters, (c) => c.charCodeAt(0));

      // convert number array to Uint8Array (binary byte array of 0 to 255) only
      const byteArray = new Uint8Array(byteNumbers);

      // convert bytes to file
      const blob = new Blob([byteArray], { type: contentType });

      // create blob url from blob
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
      return url;
    },
  });

  return { isPending, error, pdfUrl, cvCreation: mutate };
}
