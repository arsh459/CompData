import {
  VariantOption,
  VariantV2,
  VariantTemplateKey,
  variantOptionInclusionKey,
} from "../../../../models/ListingObj/VariantV2";

export const getTags = (variant: VariantV2, option: VariantOption) => {
  const tags: string[] = [];

  if (variant.variantTemplatesInclusions) {
    for (const tag in Object.keys(variant.variantTemplatesInclusions)) {
      if (variant.variantTemplatesInclusions[tag as VariantTemplateKey]) {
        tags.push(tag);
      }
    }
  }

  if (option.templatesInclusions) {
    for (const tagV2 in Object.keys(option.templatesInclusions)) {
      if (option.templatesInclusions[tagV2 as variantOptionInclusionKey]) {
        tags.push(tagV2);
      }
    }
  }

  return tags;
};
