import { useCallback, useEffect, useState } from "react";
import { db } from "@config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { Voucher } from "@models/Voucher/interface";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";
import { createNewVoucher } from "@models/Voucher/createVoucherUtils";

export const useVoucher = (uid: string, voucherId?: string) => {
  const [voucher, setVoucher] = useState<Voucher>();

  useEffect(() => {
    if (voucherId) {
      const getRemoteVoucher = async () => {
        const ref = doc(db, "sbRewards", voucherId);

        const remVoucher = await getDoc(ref);
        if (remVoucher.exists()) {
          const remoteVoucher = remVoucher.data() as Voucher | undefined;

          if (remoteVoucher) {
            setVoucher(remoteVoucher);
          }
        }
      };
      getRemoteVoucher();
    } else {
      setVoucher(createNewVoucher(uid));
    }
  }, [voucherId, uid]);

  const onCarouselMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setVoucher((prev) => {
        if (prev) {
          return {
            ...prev,
            carouselMedia: prev.carouselMedia
              ? [...prev.carouselMedia, ...newFiles]
              : newFiles,
          };
        }
      });
    },
    []
  );

  const onCarouselMediaDelete = useCallback((mediaId: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          carouselMedia: prev.carouselMedia?.filter(
            (item) => item.id !== mediaId
          ),
        };
      }
    });
  }, []);

  const onRectMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setVoucher((prev) => {
        if (prev) {
          return {
            ...prev,
            rectMedia: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onRectMediaDelete = useCallback(() => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          rectMedia: undefined,
        };
      }
    });
  }, []);

  const onMediaUpload = useCallback(
    (newFiles: (CloudinaryMedia | AWSMedia)[]) => {
      setVoucher((prev) => {
        if (prev) {
          return {
            ...prev,
            media: newFiles.length ? newFiles[0] : undefined,
          };
        }
      });
    },
    []
  );

  const onMediaDelete = useCallback(() => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          media: undefined,
        };
      }
    });
  }, []);

  const onUpdateName = (newVal: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          name: newVal,
        };
      }
    });
  };

  const onUpdateDescription = (newVal: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          description: newVal,
        };
      }
    });
  };

  const onUpdateValue = (newVal: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          value: parseInt(newVal),
        };
      }
    });
  };
  const onUpdateItemLeft = (newVal: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          itemLeft: parseInt(newVal),
        };
      }
    });
  };
  const onUpdatePriority = (newVal: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          priority: parseInt(newVal),
        };
      }
    });
  };

  const onAddProductVariant = (newVal: string) => {
    setVoucher((prev) => {
      if (prev) {
        return {
          ...prev,
          productVariants: [
            ...(prev.productVariants ? prev.productVariants : []),
            {
              name: newVal,
              id: uuidv4(),
            },
          ],
        };
      }
    });
  };

  const onRemoveProductVariant = (index: number) => {
    setVoucher((prev) => {
      if (prev && prev.productVariants) {
        return {
          ...prev,
          productVariants: [
            ...prev.productVariants.slice(0, index),
            ...prev.productVariants.slice(
              index + 1,
              prev.productVariants.length
            ),
          ],
        };
      }
    });
  };

  const onEditProductVariant = (variant: string, index: number) => {
    setVoucher((prev) => {
      if (prev && prev.productVariants) {
        return {
          ...prev,
          productVariants: [
            ...prev.productVariants.slice(0, index),
            {
              ...prev.productVariants[index],
              name: variant,
            },
            ...prev.productVariants.slice(
              index + 1,
              prev.productVariants.length
            ),
          ],
        };
      }
    });
  };

  return {
    voucher,
    setVoucher,
    onMediaDelete,
    onMediaUpload,
    onUpdateName,
    onUpdateValue,
    onUpdateDescription,
    onUpdateItemLeft,
    onUpdatePriority,
    onRectMediaUpload,
    onRectMediaDelete,
    onCarouselMediaUpload,
    onCarouselMediaDelete,
    onAddProductVariant,
    onEditProductVariant,
    onRemoveProductVariant,
  };
};
