import NumberedList, {
  ListItem,
} from "@templates/listing/NumberedList/NumberedList";
import clsx from "clsx";

interface Props {
  //   eventId: string;
  faq?: ListItem[];
  noHeading?: boolean;
}

const FAQWrapper: React.FC<Props> = ({ faq, noHeading }) => {
  return (
    <div className={clsx("pt-2")}>
      <NumberedList
        vertical={true}
        viewStyle="desktop"
        headingSeparateLine={true}
        separator="number"
        heading={noHeading ? "" : "Frequently Asked Questions"}
        listItems={faq}
        paddingString="pb-0"
      />
    </div>
  );
};

export default FAQWrapper;
