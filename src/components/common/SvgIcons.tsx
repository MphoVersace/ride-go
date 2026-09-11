import React from "react";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { colors } from "../../constants/colors";

interface IconProps {
  size?: number;
  color?: string;
}

export const PinIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={2} />
  </Svg>
);

export const TargetIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth={2} />
    <Circle cx="12" cy="12" r="3" fill={color} />
    <Path d="M12 2V4M12 20V22M2 12H4M20 12H22" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const SwapArrowsIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SteeringWheelIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
    <Path
      d="M3.5 10.5L9 11.5M20.5 10.5L15 11.5M12 15V21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const PackageIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.muted,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 12L20 7.5M12 12L4 7.5M12 12V21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SeatIcon: React.FC<IconProps> = ({
  size = 18,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 4C6 2.89543 6.89543 2 8 2H16C17.1046 2 18 2.89543 18 4V13H6V4Z"
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M4 14C4 13.4477 4.44772 13 5 13H19C19.5523 13 20 13.4477 20 14V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V14Z"
      stroke={color}
      strokeWidth={2}
    />
    <Path d="M7 18V22M17 18V22" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const ShieldCheckIcon: React.FC<IconProps> = ({
  size = 18,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L20 6.5V11.5C20 16.5 16.5 20.5 12 22C7.5 20.5 4 16.5 4 11.5V6.5L12 3Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12L11 14L15 9.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChatBubbleIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.contrast,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5 20 9.08 19.65 7.82 19.03L3 20L4.2 16.16C3.44 14.78 3 13.19 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const StarIcon: React.FC<{ size?: number; color?: string; filled?: boolean }> = ({
  size = 18,
  color = colors.accent.primary,
  filled = true,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}>
    <Path
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BellIcon: React.FC<IconProps> = ({
  size = 22,
  color = colors.text.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 22,
  color = colors.text.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SearchIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
    <Path d="M16 16L21 21" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const PhoneIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.4019C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90351 2.12787 3.62489 2.21652 3.36173C2.30516 3.09857 2.44763 2.85675 2.63486 2.65171C2.82208 2.44667 3.0498 2.28303 3.30351 2.17134C3.55723 2.05965 3.83133 2.00236 4.10999 2.00001H7.10999C7.5953 1.99525 8.06579 2.16709 8.43376 2.48354C8.80173 2.8 9.04207 3.23955 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94459 6.88792 9.97366 7.27691 9.8939 7.65089C9.81415 8.02486 9.62886 8.36812 9.35999 8.64L8.08999 9.91C9.51355 12.4136 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9586 21.2094 15.2033 21.5265 15.5768C21.8437 15.9502 22.0125 16.4267 22 16.92Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({
  size = 24,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
    <Path
      d="M8 12.5L10.5 15L16 9.5"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const CreditCardIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M2 10H22" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Path d="M6 15H10" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const WalletIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3H4C2.89543 3 2 3.89543 2 5V7H22V5C22 3.89543 21.1046 3 20 3H16Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="17" cy="14" r="1.5" fill={color} />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const HomeIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 21V12H15V21" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M16 7V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 5 8 7" stroke={color} strokeWidth={2} />
    <Path d="M2 13H22" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const UserIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const EditIcon: React.FC<IconProps> = ({
  size = 18,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4H4C2.89543 4 2 4.89543 2 6V20C2 21.1046 2.89543 22 4 22H18C19.1046 22 20 21.1046 20 20V13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SettingsIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={2} />
    <Path
      d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20 17.15A2 2 0 0 1 17.17 20L16.84 19.73A1.65 1.65 0 0 0 15 19.4A1.65 1.65 0 0 0 14 20.93V21.5A2 2 0 0 1 10 21.5V20.93A1.65 1.65 0 0 0 9 19.4A1.65 1.65 0 0 0 7.18 19.73L6.85 20A2 2 0 0 1 4.02 17.17L4.29 16.84A1.65 1.65 0 0 0 4.6 15A1.65 1.65 0 0 0 3.07 14H2.5A2 2 0 0 1 2.5 10H3.07A1.65 1.65 0 0 0 4.6 9A1.65 1.65 0 0 0 4.27 7.18L4 6.85A2 2 0 0 1 6.83 4.02L7.16 4.29A1.65 1.65 0 0 0 9 4.6A1.65 1.65 0 0 0 10 3.07V2.5A2 2 0 0 1 14 2.5V3.07A1.65 1.65 0 0 0 15 4.6A1.65 1.65 0 0 0 16.82 4.27L17.15 4A2 2 0 0 1 19.98 6.83L19.71 7.16A1.65 1.65 0 0 0 19.4 9A1.65 1.65 0 0 0 20.93 10H21.5A2 2 0 0 1 21.5 14H20.93A1.65 1.65 0 0 0 19.4 15Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({
  size = 18,
  color = colors.text.muted,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6H21M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = ({
  size = 22,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.6415 19.6871 1.81442 19.9905C1.98734 20.2939 2.23674 20.5467 2.53771 20.7239C2.83868 20.9012 3.18082 20.9967 3.53 21H20.47C20.8192 20.9967 21.1613 20.9012 21.4623 20.7239C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15449C12.6817 2.98587 12.3438 2.89746 12 2.89746C11.6562 2.89746 11.3183 2.98587 11.0188 3.15449C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 9V13M12 17H12.01" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth={2} />
    <Path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({
  size = 18,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({
  size = 18,
  color = colors.text.secondary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M18 15L12 9L6 15" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ShareIcon: React.FC<IconProps> = ({
  size = 20,
  color = colors.accent.primary,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth={2} />
    <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth={2} />
    <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth={2} />
    <Path d="M8.59 13.51L15.42 17.49M15.41 6.51L8.59 10.49" stroke={color} strokeWidth={2} />
  </Svg>
);



