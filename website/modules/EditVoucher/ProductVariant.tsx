import { ProductVariant } from "@models/MyPurchases";
import { Button, TextField } from "@mui/material";

interface Props {
  variants?: ProductVariant[];
  onAdd: (newVal: string) => void;
  onRemove: (index: number) => void;
  onEdit: (variant: string, index: number) => void;
}

const ProductVariantEditor: React.FC<Props> = ({
  variants,
  onAdd,
  onEdit,
  onRemove,
}) => {
  return (
    <div>
      <div className="flex">
        <Button onClick={() => onAdd("new")} variant="contained">
          Add Product Variant
        </Button>
      </div>
      <div className="">
        {variants?.map((item, index) => {
          return (
            <div key={item.id}>
              <p>{item.name}</p>
              <TextField
                // className="flex"
                value={item.name}
                onChange={(e) => onEdit(e.target.value, index)}
              />
              <Button onClick={() => onRemove(index)} variant="outlined">
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariantEditor;
