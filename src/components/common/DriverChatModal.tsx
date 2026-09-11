import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import { useRide } from "../../services/RideContext";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
} from "./SvgIcons";

interface DriverChatModalProps {
  visible: boolean;
  onClose: () => void;
}

export const DriverChatModal: React.FC<DriverChatModalProps> = ({
  visible,
  onClose,
}) => {
  const { driver, chatMessages, sendChatMessage } = useRide();
  const [inputText, setInputText] = useState("");

  const quickReplies = [
    "I'm at the main entrance",
    "Be right down in 1 min",
    "I'm wearing a dark jacket",
    "Waiting outside near the gate",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendChatMessage(text.trim());
    setInputText("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.driverInfo}>
              <View style={styles.avatarWrap}>
                <Text style={styles.avatarText}>{driver.avatar}</Text>
                <View style={styles.verifiedDot}>
                  <ShieldCheckIcon size={10} color={colors.accent.contrast} />
                </View>
              </View>

              <View>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverSub}>{driver.carModel} • {driver.licensePlate}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Message History */}
          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            renderItem={({ item }) => {
              const isUser = item.sender === "user";
              return (
                <View
                  style={[
                    styles.messageBubble,
                    isUser ? styles.userBubble : styles.driverBubble,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      isUser ? styles.userMessageText : styles.driverMessageText,
                    ]}
                  >
                    {item.text}
                  </Text>
                  <Text
                    style={[
                      styles.messageTime,
                      isUser ? styles.userTime : styles.driverTime,
                    ]}
                  >
                    {item.time}
                  </Text>
                </View>
              );
            }}
          />

          {/* Quick Reply Pills */}
          <View style={styles.quickRepliesSection}>
            <Text style={styles.quickSectionTitle}>Quick replies</Text>
            <View style={styles.quickChipsWrap}>
              {quickReplies.map((reply, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickChip}
                  activeOpacity={0.8}
                  onPress={() => handleSend(reply)}
                >
                  <Text style={styles.quickChipText}>{reply}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Input Bar */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Send message to driver..."
              placeholderTextColor={colors.text.muted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => handleSend(inputText)}
            />
            <TouchableOpacity
              style={[
                styles.sendBtn,
                !inputText.trim() && styles.sendBtnDisabled,
              ]}
              disabled={!inputText.trim()}
              onPress={() => handleSend(inputText)}
            >
              <ArrowRightIcon size={18} color={colors.accent.contrast} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(5, 19, 41, 0.75)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: colors.surface.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: colors.surface.border,
    maxHeight: "85%",
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatarWrap: {
    position: "relative",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.elevated,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: colors.accent.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  verifiedDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  driverSub: {
    fontSize: 12,
    color: colors.text.muted,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: colors.text.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  messagesList: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.accent.primary,
    borderBottomRightRadius: 4,
  },
  driverBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface.elevated,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: colors.accent.contrast,
    fontWeight: "600",
  },
  driverMessageText: {
    color: colors.text.primary,
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  userTime: {
    color: "rgba(7, 26, 61, 0.6)",
  },
  driverTime: {
    color: colors.text.muted,
  },
  quickRepliesSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  quickSectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text.muted,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  quickChipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  quickChip: {
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  quickChipText: {
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: "500",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: colors.surface.elevated,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    color: colors.text.primary,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtnDisabled: {
    opacity: 0.4,
  },
});

export default DriverChatModal;
