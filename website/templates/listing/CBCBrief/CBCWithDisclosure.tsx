import clsx from "clsx";
import CBCBrief from "../CBCBrief/CBCBrief";
import DisclosureElement from "../Disclosure/Disclosure";
import { ListItem } from "../NumberedList/NumberedList";

interface Props {
  creativeList: ListItem[];
  preview: boolean;
  // participatingCommunity?: string;
}

const CBCWithDisclosure: React.FC<Props> = ({
  creativeList,
  preview,
  // participatingCommunity,
}) => {
  return (
    <div id="howItWorks">
      {preview ? (
        <div className="pt-4">
          <DisclosureElement heading="How does it work?">
            <div className="" id="brief">
              <div className={clsx()}>
                <CBCBrief
                  eventType={"challenge"}
                  noHeading={true}
                  creativeList={creativeList}
                />
              </div>
            </div>
          </DisclosureElement>
        </div>
      ) : (
        <div className="pt-8 pb-4" id="brief">
          <div className={clsx()}>
            <CBCBrief eventType={"challenge"} creativeList={creativeList} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CBCWithDisclosure;
