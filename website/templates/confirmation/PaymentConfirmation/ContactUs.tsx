import { contactUsIcons } from "@constants/landing/home";
import Link from "next/link";

interface Props {}

const ContactUs: React.FC<Props> = () => {
  return (
    <div className="flex justify-around cursor-pointer">
      {contactUsIcons.map((item) => {
        return (
          <Link key={item.name} href={item.link} legacyBehavior>
            <a target="_blank">
              <div className="">
                <div className="flex justify-center">
                  <img
                    src={item.icon}
                    className="w-5 h-5 object-cover"
                    alt={item.name}
                  />
                </div>

                <p className="text-xs text-gray-500 hover:text-orange-500 pt-1">
                  {item.name}
                </p>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default ContactUs;
