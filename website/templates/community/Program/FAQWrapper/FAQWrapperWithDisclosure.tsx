import { challengeCoachFAQ } from "@hooks/event/useEventHeadings";
import { EventInterface } from "@models/Event/Event";
import FAQWrapper from "@templates/community/Program/FAQWrapper/FAQWrapper";
import DisclosureElement from "@templates/listing/Disclosure/Disclosure";

interface Props {
  selectedEvent: EventInterface;
  preview: boolean;
}

const FAQWrapperWithDisclosure: React.FC<Props> = ({
  selectedEvent,

  preview,
}) => {
  return (
    <div id="faq">
      {(selectedEvent.faq && selectedEvent.faq.length > 0) ||
      selectedEvent.parentId ? (
        <>
          {preview ? (
            <div className="pt-4">
              <DisclosureElement heading="Frequently asked questions?">
                <FAQWrapper
                  faq={
                    selectedEvent.parentId
                      ? challengeCoachFAQ
                      : selectedEvent.faq
                  }
                  noHeading={true}
                />
              </DisclosureElement>
            </div>
          ) : (
            <FAQWrapper
              faq={
                selectedEvent.parentId ? challengeCoachFAQ : selectedEvent.faq
              }
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default FAQWrapperWithDisclosure;
