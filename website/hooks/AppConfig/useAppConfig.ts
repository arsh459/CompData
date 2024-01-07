import { db } from "@config/firebase";
import { AppConfiguration } from "@models/AppConfiguration/Config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAppConfiguration = () => {
  const [config, setConfig] = useState<AppConfiguration>();
  const [configId, setConfigId] = useState<string>("");
  useEffect(() => {
    getDocs(collection(db, "config")).then((doc) => {
      if (doc && doc.docs && doc.docs.length) {
        setConfig(doc.docs[0].data() as AppConfiguration);
        setConfigId(doc.docs[0].id);
      }
    });
  }, []);

  const router = useRouter();

  const onSave = async () => {
    if (configId && config) {
      await updateDoc(doc(db, "config", configId), { ...config });

      router.back();
    }
  };

  const onUpdatePrompt = (newText: string) => {
    setConfig((prev) => {
      if (prev) {
        return {
          ...prev,
          sakhiAIPrompt: newText,
        };
      }
    });
  };

  return {
    config,
    onUpdatePrompt,
    onSave,
  };
};
