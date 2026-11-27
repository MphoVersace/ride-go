import { colors } from "../ui/theme";
import { usePreviewAccount } from "../auth/PreviewAccount";
import { KeyboardField, KeyboardFormScroll } from "../ui/KeyboardForm";
import Icon from "../ui/Icon";
import { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverVehicleSetupScreen({ navigation }) {
  const { profile, updateProfile } = usePreviewAccount();
  const [vehicleMake, setVehicleMake] = useState(profile?.vehicleMake ?? "");
  const [vehicleModel, setVehicleModel] = useState(profile?.vehicleModel ?? "");
  const [vehicleYear, setVehicleYear] = useState(profile?.vehicleYear ?? "");
  const [vehicleColor, setVehicleColor] = useState(profile?.vehicleColor ?? "");
  const [licensePlate, setLicensePlate] = useState(profile?.licensePlate ?? "");
  const vehicleMakeField = useRef(null);
  const vehicleModelField = useRef(null);
  const vehicleYearField = useRef(null);
  const vehicleColorField = useRef(null);
  const licensePlateField = useRef(null);

  const handleContinue = () => {
    if (
      !vehicleMake.trim() ||
      !vehicleModel.trim() ||
      !vehicleYear.trim() ||
      !vehicleColor.trim() ||
      !licensePlate.trim()
    ) {
      Alert.alert(
        "Complete your vehicle details",
        "Please fill in all vehicle details before continuing.",
      );
      return;
    }

    updateProfile({
      vehicleMake: vehicleMake.trim(), vehicleModel: vehicleModel.trim(), vehicleYear: vehicleYear.trim(),
      vehicleColor: vehicleColor.trim(), licensePlate: licensePlate.trim(),
    });
    navigation.navigate("DriverDocumentsSetup");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <KeyboardFormScroll
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

            <Text style={styles.stepText}>Driver setup · Step 1 of 2</Text>

            <View style={styles.topBarSpacer} />
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>RideGo</Text>
          </View>

          <View style={styles.heroSection}>
            <Text style={styles.title}>Add your vehicle</Text>

            <Text style={styles.subtitle}>
              Tell us about the vehicle you'll use to provide rides with RideGo.
            </Text>
          </View>

          <View style={styles.vehicleVisual}>
            <View style={styles.vehicleCircle}>
              <Icon name="car" style={styles.vehicleGlyph} />
            </View>

            <Text style={styles.vehicleVisualTitle}>Your RideGo vehicle</Text>

            <Text style={styles.vehicleVisualSubtitle}>
              Vehicle information will be reviewed before you can go online.
            </Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Vehicle details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Vehicle make</Text>

              <KeyboardField
                ref={vehicleMakeField}
                nextRef={vehicleModelField}
                style={styles.input}
                placeholder="e.g. Toyota"
                placeholderTextColor={colors.muted}
                value={vehicleMake}
                onChangeText={setVehicleMake}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Vehicle model</Text>

              <KeyboardField
                ref={vehicleModelField}
                nextRef={vehicleYearField}
                style={styles.input}
                placeholder="e.g. Corolla"
                placeholderTextColor={colors.muted}
                value={vehicleModel}
                onChangeText={setVehicleModel}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Year</Text>

                <KeyboardField
                  ref={vehicleYearField}
                  nextRef={vehicleColorField}
                  style={styles.input}
                  placeholder="e.g. 2022"
                  placeholderTextColor={colors.muted}
                  value={vehicleYear}
                  onChangeText={setVehicleYear}
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfInput]}>
                <Text style={styles.inputLabel}>Colour</Text>

                <KeyboardField
                  ref={vehicleColorField}
                  nextRef={licensePlateField}
                  style={styles.input}
                  placeholder="e.g. Silver"
                  placeholderTextColor={colors.muted}
                  value={vehicleColor}
                  onChangeText={setVehicleColor}
                  autoCapitalize="words"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>License plate</Text>

              <KeyboardField
                ref={licensePlateField}
                onSubmitEditing={handleContinue}
                style={styles.input}
                placeholder="e.g. KDF 482 GP"
                placeholderTextColor={colors.muted}
                value={licensePlate}
                onChangeText={setLicensePlate}
                autoCapitalize="characters"
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Icon name="info" style={styles.infoIcon} />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Keep your details accurate</Text>

              <Text style={styles.infoText}>
                Your vehicle information will help riders identify your car when
                you're matched for a trip.
              </Text>
            </View>
          </View>

          <View style={styles.bottomSpacing} />
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.8}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>Continue →</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              You can update your vehicle details later.
            </Text>
          </View>
        </KeyboardFormScroll>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    backgroundColor: colors.blueTint,
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonText: {
    color: colors.black,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "300",
    marginTop: -2,
  },

  stepText: {
    color: colors.muted,
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
    backgroundColor: colors.blueLine,
    overflow: "hidden",
    marginBottom: 26,
  },

  progressFill: {
    width: "50%",
    height: "100%",
    backgroundColor: colors.blue,
    borderRadius: 10,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoText: {
    color: colors.black,
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: -1,
  },

  heroSection: {
    marginBottom: 22,
  },

  title: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: -0.8,
    marginBottom: 9,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 340,
  },

  vehicleVisual: {
    backgroundColor: colors.blueTint,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 20,
    alignItems: "center",
    marginBottom: 28,
  },

  vehicleCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.blueLine,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  vehicleGlyph: {
    fontSize: 36,
  },

  vehicleVisualTitle: {
    color: colors.black,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },

  vehicleVisualSubtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    maxWidth: 290,
  },

  formSection: {
    marginBottom: 22,
  },

  sectionTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },

  inputGroup: {
    marginBottom: 16,
  },

  inputLabel: {
    color: "#DCE7FA",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderRadius: 15,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: "#24446F",
    paddingHorizontal: 16,
    color: colors.black,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: colors.blueTint,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  infoIconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.blueLine,
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
    color: colors.black,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 5,
  },

  infoText: {
    color: colors.muted,
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
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#102A56",
  },

  continueButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.blue,
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

  continueButtonText: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  footerText: {
    color: colors.muted,
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },
});
