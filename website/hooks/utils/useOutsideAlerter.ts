import { useEffect } from "react";
function useOutsideAlerter(
  ref: React.MutableRefObject<any>,
  func: () => void,
  modalVisible: boolean
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        func();
      }
    }

    if (modalVisible) {
      // Bind the event listener
      // console.log('event added');
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, modalVisible]);
}

export default useOutsideAlerter;
