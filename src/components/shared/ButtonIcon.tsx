import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import { palette } from "../../constant";

interface ButtonIconProps {
  icon: IconProp;
  ariaLabel?: string;
  title?: string;
  size?: number;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ButtonIcon({
  title,
  icon,
  size = 18,
  onClick,
  onMouseEnter,
  onMouseLeave,
  href,
  active = false,
  ariaLabel,
}: ButtonIconProps) {
  if (href) {
    return (
      <button
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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
    <button
      title={title}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <FontAwesomeIcon
        icon={icon}
        fontSize={size}
        color={active ? palette.signatureColor : "white"}
      />
    </button>
  );
}
