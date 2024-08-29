import { useEffect, useState } from "react";

export const useLocalImage = (imageFile: FileList | string) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const isImageUrl = typeof imageFile === "string";

    if (isImageUrl) {
      setImagePreview(imageFile);
      return;
    }

    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  return imagePreview;
};
