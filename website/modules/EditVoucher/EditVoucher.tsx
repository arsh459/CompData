import Loading from "@components/loading/Loading";
import UppyWidgetContainer from "@components/Uppy/UppyWidgetContainer";
import { useAuth } from "@hooks/auth/useAuth";
import { useVoucher } from "@hooks/sbRewards/useVoucher";
import { saveNewVoucher } from "@models/Voucher/createVoucherUtils";
import { TextField } from "@mui/material";
import BottomNavComV2 from "@templates/listing/Book/BottomNavComV2";
import { useRouter } from "next/router";
import { updateSbVoucher } from "./utils";
import ProductVariantEditor from "./ProductVariant";
interface Props {
  voucherId?: string;
  uid: string;
}
const EditVoucher: React.FC<Props> = ({ voucherId, uid }) => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    voucher,
    onMediaDelete,
    onMediaUpload,
    onUpdateDescription,
    onUpdateItemLeft,
    onUpdateName,
    onUpdatePriority,
    onUpdateValue,
    onRectMediaUpload,
    onAddProductVariant,
    onEditProductVariant,
    onRemoveProductVariant,
    onRectMediaDelete,
    onCarouselMediaUpload,
    onCarouselMediaDelete,
  } = useVoucher(uid, voucherId);

  return (
    <div>
      <>
        {!voucher?.id && !user?.uid ? (
          <div className="pt-8">
            <div className="flex justify-center items-center">
              <Loading fill="#ff735c" width={48} height={48} />
            </div>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex">
              <div className="p-4">
                <UppyWidgetContainer
                  media={voucher?.media ? [voucher?.media] : []}
                  leftButtonText="Add media"
                  uid={user?.uid ? user.uid : ""}
                  onDelete={onMediaDelete}
                  onUpload={onMediaUpload}
                  onRemove={onMediaDelete}
                  heading=""
                  helperText=""
                  height="none"
                  filterButton={true}
                  tileHeight="small"
                  bgWhite={true}
                  screenName="admin"
                  taskName="admin"
                />
              </div>

              <div className="p-4">
                <UppyWidgetContainer
                  media={voucher?.rectMedia ? [voucher?.rectMedia] : []}
                  leftButtonText="Rectangular media"
                  uid={user?.uid ? user.uid : ""}
                  onDelete={onRectMediaDelete}
                  onUpload={onRectMediaUpload}
                  onRemove={onRectMediaDelete}
                  heading=""
                  helperText=""
                  height="none"
                  filterButton={true}
                  tileHeight="small"
                  bgWhite={true}
                  screenName="admin"
                  taskName="admin"
                />
              </div>

              <div className="p-4">
                <UppyWidgetContainer
                  media={voucher?.carouselMedia ? voucher?.carouselMedia : []}
                  leftButtonText="Carousel media"
                  uid={user?.uid ? user.uid : ""}
                  onDelete={(target) => onCarouselMediaDelete(target.id)}
                  onUpload={onCarouselMediaUpload}
                  onRemove={onCarouselMediaDelete}
                  heading=""
                  helperText=""
                  height="none"
                  filterButton={true}
                  tileHeight="small"
                  bgWhite={true}
                  screenName="admin"
                  taskName="admin"
                />
              </div>
            </div>

            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={""}
                label={"Name of Voucher"}
                variant="outlined"
                onChange={(val) => onUpdateName(val.target.value)}
                value={voucher?.name}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Value of voucher in INR"}
                label={"Value"}
                variant="outlined"
                onChange={(val) => onUpdateValue(val.target.value)}
                value={voucher?.value || 0}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"items left"}
                label={"itemLeft"}
                variant="outlined"
                onChange={(val) => onUpdateItemLeft(val.target.value)}
                value={voucher?.itemLeft || 1}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"priority"}
                label={"priority"}
                variant="outlined"
                onChange={(val) => onUpdatePriority(val.target.value)}
                value={voucher?.priority || 1}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className="pt-4">
              <TextField
                style={{ width: "100%" }}
                placeholder={"Description"}
                label={"Description"}
                onChange={(val) => onUpdateDescription(val.target.value)}
                value={voucher?.description}
                multiline={true}
                minRows={5}
                maxRows={8}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className="pt-4">
              <ProductVariantEditor
                variants={voucher?.productVariants}
                onAdd={onAddProductVariant}
                onRemove={onRemoveProductVariant}
                onEdit={onEditProductVariant}
              />
            </div>
          </div>
        )}
      </>

      <div>
        <BottomNavComV2
          cta={"Update SB Vouchers"}
          onClick={async () => {
            if (voucher) {
              if (voucherId) {
                await saveNewVoucher(voucher);
              } else {
                await updateSbVoucher(voucher);
              }

              router.back();
            }
          }}
        />
      </div>
    </div>
  );
};

export default EditVoucher;
