import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { palette } from "../../constant";

interface ButtonIconProps {
  icon: IconProp;
  size?: number;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  ariaLabel: string;
}

export function ButtonIcon({
  icon,
  size = 18,
  onClick,
  href,
  active = false,
  ariaLabel,
}: ButtonIconProps) {
  if (href) {
    return (
      <button aria-label={ariaLabel} onClick={onClick}>
        <Link to={href} aria-label="페이지 이동">
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
    <button aria-label={ariaLabel} onClick={onClick}>
      <FontAwesomeIcon
        icon={icon}
        fontSize={size}
        color={active ? palette.signatureColor : "white"}
      />
    </button>
  );
}
