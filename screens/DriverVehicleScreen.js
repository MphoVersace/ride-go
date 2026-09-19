import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriverVehicleScreen = ({ navigation }) => {
  const handleEditVehicle = () => {
    Alert.alert("Edit vehicle", "Vehicle editing will be connected later.");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.eyebrow}>DRIVER ACCOUNT</Text>
            <Text style={styles.title}>My Vehicle</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.vehicleHero}>
            <View style={styles.vehicleIconCircle}>
              <Text style={styles.vehicleIcon}>🚗</Text>
            </View>

            <View style={styles.vehicleHeroContent}>
              <Text style={styles.vehicleName}>Toyota Corolla</Text>
              <Text style={styles.vehicleSubtitle}>2022 • White</Text>

              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedIcon}>✓</Text>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Vehicle details</Text>

              <TouchableOpacity onPress={handleEditVehicle} activeOpacity={0.8}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>M</Text>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Make</Text>
                  <Text style={styles.detailValue}>Toyota</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>C</Text>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Model</Text>
                  <Text style={styles.detailValue}>Corolla</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>Y</Text>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Year</Text>
                  <Text style={styles.detailValue}>2022</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>C</Text>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Colour</Text>
                  <Text style={styles.detailValue}>White</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Text style={styles.detailIconText}>#</Text>
                </View>

                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Registration</Text>
                  <Text style={styles.detailValue}>GP 123 456</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle status</Text>

            <View style={styles.statusCard}>
              <View style={styles.statusIcon}>
                <Text style={styles.statusIconText}>✓</Text>
              </View>

              <View style={styles.statusContent}>
                <Text style={styles.statusTitle}>Vehicle verified</Text>

                <Text style={styles.statusText}>
                  Your vehicle has been reviewed and approved for RideGo trips.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle documents</Text>

            <View style={styles.card}>
              <TouchableOpacity
                style={styles.documentRow}
                onPress={() =>
                  Alert.alert(
                    "Vehicle registration",
                    "Document details will be connected later.",
                  )
                }
                activeOpacity={0.8}
              >
                <View style={styles.documentIcon}>
                  <Text style={styles.documentIconText}>▣</Text>
                </View>

                <View style={styles.documentContent}>
                  <Text style={styles.documentTitle}>Vehicle registration</Text>
                  <Text style={styles.documentStatus}>Verified</Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.documentRow}
                onPress={() =>
                  Alert.alert(
                    "Vehicle inspection",
                    "Document details will be connected later.",
                  )
                }
                activeOpacity={0.8}
              >
                <View style={styles.documentIcon}>
                  <Text style={styles.documentIconText}>✓</Text>
                </View>

                <View style={styles.documentContent}>
                  <Text style={styles.documentTitle}>Vehicle inspection</Text>
                  <Text style={styles.documentStatus}>Verified</Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Keep your vehicle information updated
              </Text>

              <Text style={styles.infoText}>
                RideGo may require updated vehicle information or documents to
                keep your driver account active.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.backHomeButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backHomeButtonText}>Back to Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  header: {
    minHeight: 82,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: "#0F5FA8",
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "#64748B",
    marginBottom: 3,
  },

  title: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },

  vehicleHero: {
    backgroundColor: "#0F5FA8",
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  vehicleIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  vehicleIcon: {
    fontSize: 34,
  },

  vehicleHeroContent: {
    flex: 1,
  },

  vehicleName: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  vehicleSubtitle: {
    fontSize: 14,
    color: "#D9ECFF",
    marginBottom: 10,
  },

  verifiedBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDF7E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  verifiedIcon: {
    fontSize: 12,
    fontWeight: "800",
    color: "#15803D",
    marginRight: 5,
  },

  verifiedText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#15803D",
  },

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  editText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F5FA8",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  detailRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
  },

  detailIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  detailIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F5FA8",
  },

  detailContent: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  statusCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    flexDirection: "row",
    alignItems: "flex-start",
  },

  statusIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  statusIconText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#15803D",
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#166534",
    marginBottom: 5,
  },

  statusText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#3F6212",
  },

  documentRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
  },

  documentIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  documentIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F5FA8",
  },

  documentContent: {
    flex: 1,
  },

  documentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },

  documentStatus: {
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
  },

  chevron: {
    fontSize: 27,
    color: "#94A3B8",
    marginLeft: 10,
  },

  infoCard: {
    backgroundColor: "#EAF4FF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0F5FA8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoIconText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F3F6D",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#365A78",
  },

  backHomeButton: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#0F5FA8",
    alignItems: "center",
    justifyContent: "center",
  },

  backHomeButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

export default DriverVehicleScreen;
