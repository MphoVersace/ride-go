import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverDocumentsSetupScreen({ navigation }) {
  const handleUpload = (documentName) => {
    Alert.alert(
      "Upload document",
      `${documentName} upload will be connected later.`
    );
  };

  const handleFinish = () => {
    Alert.alert(
      "Driver profile submitted",
      "Your driver profile has been submitted for review.",
      [
        {
          text: "Continue",
          onPress: () => navigation.navigate("DriverHome"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.stepText}>Step 3 of 3</Text>

            <View style={styles.topBarSpacer} />
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>RideGo</Text>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.title}>Verify your documents</Text>

            <Text style={styles.subtitle}>
              Upload the required documents so we can review your driver
              profile before you start accepting rides.
            </Text>
          </View>

          <View style={styles.verificationCard}>
            <View style={styles.verificationIcon}>
              <Text style={styles.verificationEmoji}>🛡️</Text>
            </View>

            <View style={styles.verificationContent}>
              <Text style={styles.verificationTitle}>
                Your information is protected
              </Text>

              <Text style={styles.verificationText}>
                Your documents will be used for driver verification and
                compliance purposes.
              </Text>
            </View>
          </View>

          <View style={styles.documentsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Required documents</Text>

              <View style={styles.requiredBadge}>
                <Text style={styles.requiredBadgeText}>REQUIRED</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.documentCard}
              activeOpacity={0.8}
              onPress={() => handleUpload("Driver's licence")}
            >
              <View style={styles.documentIconContainer}>
                <Text style={styles.documentIcon}>🪪</Text>
              </View>

              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Driver's licence</Text>

                <Text style={styles.documentSubtitle}>
                  Upload a clear photo of your valid driver's licence.
                </Text>

                <View style={styles.uploadRow}>
                  <Text style={styles.uploadText}>Upload document</Text>
                  <Text style={styles.uploadArrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.documentCard}
              activeOpacity={0.8}
              onPress={() => handleUpload("Vehicle registration")}
            >
              <View style={styles.documentIconContainer}>
                <Text style={styles.documentIcon}>📄</Text>
              </View>

              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>
                  Vehicle registration
                </Text>

                <Text style={styles.documentSubtitle}>
                  Upload your vehicle registration document.
                </Text>

                <View style={styles.uploadRow}>
                  <Text style={styles.uploadText}>Upload document</Text>
                  <Text style={styles.uploadArrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.documentCard}
              activeOpacity={0.8}
              onPress={() => handleUpload("Vehicle inspection")}
            >
              <View style={styles.documentIconContainer}>
                <Text style={styles.documentIcon}>🔍</Text>
              </View>

              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>
                  Vehicle inspection
                </Text>

                <Text style={styles.documentSubtitle}>
                  Upload your valid vehicle inspection document.
                </Text>

                <View style={styles.uploadRow}>
                  <Text style={styles.uploadText}>Upload document</Text>
                  <Text style={styles.uploadArrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.optionalSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Optional</Text>

              <View style={styles.optionalBadge}>
                <Text style={styles.optionalBadgeText}>OPTIONAL</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.documentCard}
              activeOpacity={0.8}
              onPress={() => handleUpload("Profile photo")}
            >
              <View style={styles.documentIconContainer}>
                <Text style={styles.documentIcon}>📷</Text>
              </View>

              <View style={styles.documentContent}>
                <Text style={styles.documentTitle}>Profile photo</Text>

                <Text style={styles.documentSubtitle}>
                  Add a clear photo so riders can recognise you.
                </Text>

                <View style={styles.uploadRow}>
                  <Text style={styles.uploadText}>Add photo</Text>
                  <Text style={styles.uploadArrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>ℹ️</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Almost ready to drive</Text>

              <Text style={styles.infoText}>
                Once your documents are reviewed and approved, you'll be able
                to start receiving ride requests.
              </Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.finishButton}
            activeOpacity={0.8}
            onPress={handleFinish}
          >
            <Text style={styles.finishButtonText}>
              Submit for Review →
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            You can update your documents later.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#102A56",
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "300",
    marginTop: -2,
  },

  stepText: {
    color: "#AFC2E8",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  topBarSpacer: {
    width: 42,
  },

  progressTrack: {
    height: 5,
    borderRadius: 10,
    backgroundColor: "#18335F",
    overflow: "hidden",
    marginBottom: 26,
  },

  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#5BC0FF",
    borderRadius: 10,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -1,
  },

  heroSection: {
    marginBottom: 22,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginBottom: 9,
  },

  subtitle: {
    color: "#AFC2E8",
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 350,
  },

  verificationCard: {
    flexDirection: "row",
    backgroundColor: "#0D2853",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1D3B6D",
    marginBottom: 28,
  },

  verificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#123563",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  verificationEmoji: {
    fontSize: 21,
  },

  verificationContent: {
    flex: 1,
  },

  verificationTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },

  verificationText: {
    color: "#91A8D1",
    fontSize: 12,
    lineHeight: 18,
  },

  documentsSection: {
    marginBottom: 24,
  },

  optionalSection: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  requiredBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#183967",
  },

  requiredBadgeText: {
    color: "#5BC0FF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  optionalBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "#102A56",
  },

  optionalBadgeText: {
    color: "#91A8D1",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.6,
  },

  documentCard: {
    flexDirection: "row",
    backgroundColor: "#0D2853",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1D3B6D",
    marginBottom: 12,
  },

  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#123563",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  documentIcon: {
    fontSize: 23,
  },

  documentContent: {
    flex: 1,
  },

  documentTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 5,
  },

  documentSubtitle: {
    color: "#91A8D1",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 9,
  },

  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  uploadText: {
    color: "#5BC0FF",
    fontSize: 12,
    fontWeight: "800",
  },

  uploadArrow: {
    color: "#5BC0FF",
    fontSize: 15,
    fontWeight: "900",
    marginLeft: 6,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#102A56",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1D3B6D",
  },

  infoIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#183967",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoIcon: {
    fontSize: 16,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },

  infoText: {
    color: "#91A8D1",
    fontSize: 12,
    lineHeight: 18,
  },

  bottomSpacing: {
    height: 12,
  },

  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: "#071A3D",
    borderTopWidth: 1,
    borderTopColor: "#102A56",
  },

  finishButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  finishButtonText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  footerText: {
    color: "#71809F",
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },
});
