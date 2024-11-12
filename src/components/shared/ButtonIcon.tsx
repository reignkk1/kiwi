import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface ButtonIconProps {
  icon: IconProp;
  size?: string;
  color?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
}

export function ButtonIcon({
  icon,
  size,
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
            fontSize="18px"
            color={
              active ? "var(--signature-color)" : "rgba(255, 255, 255, 0.6)"
            }
          />
        </Link>
      </button>
    );
  }

  return (
    <button onClick={onClick}>
      <FontAwesomeIcon icon={icon} fontSize={size} color="white" />
    </button>
  );
}
