import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { palette } from "../../constant";

interface ButtonIconProps {
  icon: IconProp;
  size?: number;
  color?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}

export function ButtonIcon({
  icon,
  size = 18,
  onClick,
  href,
  active,
}: ButtonIconProps) {
  if (href) {
    return (
      <button onClick={onClick}>
        <Link to={href}>
          <FontAwesomeIcon
            icon={icon}
            fontSize={size}
            color={active ? palette.signatureColor : "rgba(255, 255, 255, 0.6)"}
          />
        </Link>
      </button>
    );
  }

  return (
    <button onClick={onClick}>
      <FontAwesomeIcon
        icon={icon}
        fontSize={size}
        color={active ? palette.signatureColor : "white"}
      />
    </button>
  );
}
