import * as Yup from "yup";

export const recipeValidatorSchema = Yup.object().shape({
  step_1_Results: Yup.string().required(
    "Low oil homemade cooking style is required.",
  ),
  step_2_Results: Yup.array()
    .of(Yup.string().required())
    .required("Ingredient list is required."),
  Ingredient_Details: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required(),
        protein: Yup.number().required(),
        fats: Yup.number().required(),
        kcal: Yup.number().required(),
        fiber: Yup.number().required(),
        carbs: Yup.number().required(),
        quantity: Yup.number().required(),
      }),
    )
    .required("Ingredient details are required."),
  Recipe_Details: Yup.array()
    .of(Yup.string().required())
    .required("Recipe details are required."),
  Ingredient_Quantities_For_Recipe: Yup.object()
    .test(
      "is-object-and-not-empty",
      "Ingredient quantities must be a non-empty object.",
      (value) => {
        // Check if it's an object and not an array or null
        if (
          typeof value !== "object" ||
          value === null ||
          Array.isArray(value)
        ) {
          return false;
        }
        return Object.keys(value).length > 0;
      },
    )
    .test(
      "values-are-number-or-string",
      "Each ingredient quantity must be a number or a string",
      (value) => {
        return Object.values(value).every(
          (val) => typeof val === "number" || typeof val === "string",
        );
      },
    )
    .required("Ingredient quantities are required."),
  "standard of dish": Yup.object()
    .shape({
      standard_quantity: Yup.number().required(),
      unit: Yup.string().required(),
      gram_equivalent: Yup.number().required(),
    })
    .required("Standard of dish is required."),
  cooking_time: Yup.number().required("Cooking time is required."),
});

export type SubTaskModelAI = Yup.InferType<typeof recipeValidatorSchema>;
