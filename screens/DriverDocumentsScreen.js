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

const DriverDocumentsScreen = ({ navigation }) => {
  const handleDocumentPress = (documentName) => {
    Alert.alert(
      documentName,
      "Document details and upload functionality will be connected later.",
    );
  };

  const documents = [
    {
      title: "Driver's licence",
      description: "Valid driver's licence",
      status: "Verified",
      statusColor: "#15803D",
      icon: "DL",
    },
    {
      title: "Vehicle registration",
      description: "Vehicle registration certificate",
      status: "Verified",
      statusColor: "#15803D",
      icon: "VR",
    },
    {
      title: "Vehicle inspection",
      description: "Vehicle inspection certificate",
      status: "Verified",
      statusColor: "#15803D",
      icon: "VI",
    },
    {
      title: "Profile photo",
      description: "Driver profile photo",
      status: "Uploaded",
      statusColor: "#0F5FA8",
      icon: "PH",
    },
  ];

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
            <Text style={styles.title}>Documents</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.introCard}>
            <View style={styles.introIcon}>
              <Text style={styles.introIconText}>✓</Text>
            </View>

            <View style={styles.introContent}>
              <Text style={styles.introTitle}>
                Your documents are up to date
              </Text>

              <Text style={styles.introText}>
                Keep your driver and vehicle documents current to continue
                accepting RideGo trips.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Required documents</Text>

            <View style={styles.card}>
              {documents.slice(0, 3).map((document, index) => (
                <React.Fragment key={document.title}>
                  <TouchableOpacity
                    style={styles.documentRow}
                    onPress={() => handleDocumentPress(document.title)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.documentIcon}>
                      <Text style={styles.documentIconText}>
                        {document.icon}
                      </Text>
                    </View>

                    <View style={styles.documentContent}>
                      <Text style={styles.documentTitle}>{document.title}</Text>

                      <Text style={styles.documentDescription}>
                        {document.description}
                      </Text>

                      <View style={styles.statusBadge}>
                        <Text style={styles.statusCheck}>✓</Text>

                        <Text
                          style={[
                            styles.statusText,
                            { color: document.statusColor },
                          ]}
                        >
                          {document.status}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>

                  {index < 2 && <View style={styles.divider} />}
                </React.Fragment>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile document</Text>

            <View style={styles.card}>
              <TouchableOpacity
                style={styles.documentRow}
                onPress={() => handleDocumentPress("Profile photo")}
                activeOpacity={0.8}
              >
                <View style={styles.photoIcon}>
                  <Text style={styles.photoIconText}>PH</Text>
                </View>

                <View style={styles.documentContent}>
                  <Text style={styles.documentTitle}>Profile photo</Text>

                  <Text style={styles.documentDescription}>
                    Driver profile photo
                  </Text>

                  <View style={styles.uploadedBadge}>
                    <Text style={styles.uploadedDot}>•</Text>

                    <Text style={styles.uploadedText}>Uploaded</Text>
                  </View>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Verification</Text>

            <View style={styles.verificationCard}>
              <View style={styles.verificationIcon}>
                <Text style={styles.verificationIconText}>✓</Text>
              </View>

              <View style={styles.verificationContent}>
                <Text style={styles.verificationTitle}>
                  Driver account verified
                </Text>

                <Text style={styles.verificationText}>
                  Your required driver documents have been reviewed and verified
                  by RideGo.
                </Text>

                <Text style={styles.verificationDate}>
                  Last reviewed: 12 September 2026
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Document requirements</Text>

              <Text style={styles.infoText}>
                Documents must be clear, readable and valid. RideGo may request
                updated documents when they expire.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.backButtonLarge}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonLargeText}>Back to Profile</Text>
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

  introCard: {
    backgroundColor: "#F0FDF4",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  introIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  introIconText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#15803D",
  },

  introContent: {
    flex: 1,
  },

  introTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#166534",
    marginBottom: 5,
  },

  introText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#3F6212",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  documentRow: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
  },

  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  documentIconText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#0F5FA8",
  },

  photoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F1EAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  photoIconText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#7C3AED",
  },

  documentContent: {
    flex: 1,
  },

  documentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 3,
  },

  documentDescription: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 7,
  },

  statusBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },

  statusCheck: {
    fontSize: 12,
    fontWeight: "900",
    color: "#15803D",
    marginRight: 5,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },

  uploadedBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
  },

  uploadedDot: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F5FA8",
    marginRight: 5,
  },

  uploadedText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F5FA8",
  },

  chevron: {
    fontSize: 27,
    color: "#94A3B8",
    marginLeft: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },

  verificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  verificationIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  verificationIconText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#15803D",
  },

  verificationContent: {
    flex: 1,
  },

  verificationTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 5,
  },

  verificationText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
    marginBottom: 8,
  },

  verificationDate: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
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

  backButtonLarge: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#0F5FA8",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonLargeText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

export default DriverDocumentsScreen;
