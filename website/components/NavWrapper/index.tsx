import Link from "next/link";
import React from "react";
interface Props {
  link?: string;
  baseLink?: string;
  children: React.ReactNode;
}
const NavWrapper: React.FC<Props> = ({ link, children, baseLink }) => {
  return (
    <>
      {link ? (
        <Link href={baseLink ? `${baseLink}/${link}` : link}>{children}</Link>
      ) : (
        children
      )}
    </>
  );
};

export default NavWrapper;
