import * as Yup from "yup";

export const dishNameValidation = Yup.object().shape({
  validity: Yup.string().required(),
  processing: Yup.string()
    .nullable()
    .oneOf(
      [null, "cooked", "packaged"],
      'processing must be null, "cooked", or "packaged"',
    ),
});

export type DishNameModel = Yup.InferType<typeof dishNameValidation>;
