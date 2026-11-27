import {
  ArrowDown, ArrowLeft, ArrowLeftRight, ArrowRight, ArrowUpRight, Bell, BriefcaseBusiness, CalendarDays,
  Camera, CarFront, Check, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, Clock3,
  Compass, CreditCard, Eye, EyeOff, FileText, Gift, Globe, Headphones, House, IdCard,
  Info, Lightbulb, LockKeyhole, LogOut, Mail, MapPin, MessageCircle, Moon, Palette,
  Phone, Plus, ReceiptText, Route, Ruler, Search, Settings, ShieldCheck, Siren,
  Smartphone, Sparkles, Star, Timer, TriangleAlert, UserRound, UsersRound, Wallet, X,
} from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { colors } from './theme';

const icons = {
  down: ArrowDown, back: ArrowLeft, swap: ArrowLeftRight, arrow: ArrowRight, external: ArrowUpRight,
  bell: Bell, work: BriefcaseBusiness, calendar: CalendarDays, camera: Camera,
  car: CarFront, check: Check, left: ChevronLeft, right: ChevronRight, help: CircleHelp,
  list: ClipboardList, clock: Clock3, compass: Compass, card: CreditCard, eye: Eye,
  eyeOff: EyeOff, document: FileText, gift: Gift, globe: Globe, headset: Headphones,
  home: House, id: IdCard, info: Info, bulb: Lightbulb, lock: LockKeyhole,
  logout: LogOut, mail: Mail, pin: MapPin, message: MessageCircle, moon: Moon,
  palette: Palette, phone: Phone, plus: Plus, receipt: ReceiptText, route: Route,
  ruler: Ruler, search: Search, settings: Settings, shield: ShieldCheck, siren: Siren,
  mobile: Smartphone, sparkle: Sparkles, star: Star, timer: Timer,
  warning: TriangleAlert, user: UserRound, users: UsersRound, wallet: Wallet, close: X,
};

export default function Icon({ name, color, size, style }) {
  const Glyph = icons[name];
  if (!Glyph) return null;
  const textStyle = StyleSheet.flatten(style);
  return (
    <Glyph
      accessible={false}
      size={size ?? textStyle?.fontSize ?? 22}
      color={color ?? textStyle?.color ?? colors.navy}
      strokeWidth={1.8}
      style={style}
    />
  );
}
