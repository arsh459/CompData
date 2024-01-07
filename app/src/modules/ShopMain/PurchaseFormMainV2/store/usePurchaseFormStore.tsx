import { Voucher } from "@models/Voucher/interface";
import { create } from "zustand";

export interface ProductVariant {
  id: string;
  name: string;
}
type setter =
  | "name"
  | "email"
  | "phoneNumber"
  | "city"
  | "state"
  | "pincode"
  | "fullAddress"
  | "productVariants";


export interface PurchaseDetails {
  name: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  pincode: string;
  fullAddress: string;
  selectedProductVariant: ProductVariant;
}



export interface PurchaseFormInterface {
  name: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  pincode: string;
  fullAddress: string;
  productVariants: ProductVariant[];
  selectedProductVariant: ProductVariant;
  formStage: number;
  voucher?: Voucher;
  onInitFunc: (data: PurchaseDetails ) => void;
  setVoucher: (voucher: Voucher) => void;
  setProductVariants: (variants: ProductVariant[]) => void;
  setFormStage: (stageNum: number) => void;
  detailSetter: (setterName: setter, data: string) => void;
  selectProdVariant: (variantData: ProductVariant) => void;
  getPurchaseDetails: () => PurchaseDetails;
}
// onInit function take name , email phone pre filled data

export const usePurchaseFormStore = create<PurchaseFormInterface>(
  (set, get) => ({
    name: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
    pincode: "",
    fullAddress: "",
    voucher: undefined,
    selectedProductVariant: { id: "default", name: "" },
    formStage: 1,
    onInitFunc: (data: PurchaseDetails) => {
      set((state) => ({
        ...state,
        ...data
      }))
    },
    setVoucher: (voucher: Voucher) => {
      set((state) => ({
        ...state,
        voucher: voucher
      }))
    },
    setFormStage: (stageNumber: number) => {
      set((state) => ({
        ...state,
        formStage: stageNumber,
      }));
    },
    productVariants: [],
    detailSetter: (setterName: setter, data: string) => {
      set((state) => ({
        ...state,
        [setterName]: data,
      }));
    },
    selectProdVariant: (variantData: ProductVariant) => {
      set((state) => ({
        ...state,
        selectedProductVariant: variantData,
      }));
    },
    setProductVariants: (data: ProductVariant[]) => {
      set((state) => ({
        ...state,
        productVariants: data,
      }));
    },
    getPurchaseDetails: () => {
      const {
        name,
        email,
        phoneNumber,
        state,
        city,
        pincode,
        fullAddress,
        selectedProductVariant,
      } = get();

      return {
        name,
        email,
        phoneNumber,
        state,
        city,
        pincode,
        fullAddress,
        selectedProductVariant,
      };
    },
  })
);
