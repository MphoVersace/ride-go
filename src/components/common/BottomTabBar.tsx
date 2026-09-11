import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import {
  HomeIcon,
  SteeringWheelIcon,
  WalletIcon,
  UserIcon,
} from "./SvgIcons";

export type TabKey = "home" | "trips" | "wallet" | "profile";

interface BottomTabBarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    {
      key: "home" as TabKey,
      label: "Home",
      icon: (color: string) => <HomeIcon size={20} color={color} />,
    },
    {
      key: "trips" as TabKey,
      label: "Trips",
      icon: (color: string) => <SteeringWheelIcon size={20} color={color} />,
    },
    {
      key: "wallet" as TabKey,
      label: "Wallet",
      icon: (color: string) => <WalletIcon size={20} color={color} />,
    },
    {
      key: "profile" as TabKey,
      label: "Profile",
      icon: (color: string) => <UserIcon size={20} color={color} />,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const color = isActive ? colors.accent.primary : colors.text.muted;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.tabButtonActive]}
              activeOpacity={0.8}
              onPress={() => onSelectTab(tab.key)}
            >
              {tab.icon(color)}
              <Text
                style={[styles.tabLabel, isActive && styles.tabLabelActive]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: spacing.sm,
    left: spacing.md,
    right: spacing.md,
    zIndex: 99,
  },
  bar: {
    flexDirection: "row",
    backgroundColor: colors.surface.card,
    borderRadius: 30,
    height: 62,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },
  tabButtonActive: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.muted,
    marginTop: 3,
  },
  tabLabelActive: {
    color: colors.accent.primary,
    fontWeight: "bold",
  },
});

export default BottomTabBar;
