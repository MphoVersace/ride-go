import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("Mpho");
  const [lastName, setLastName] = useState("Mtlomelo");
  const [phone, setPhone] = useState("+27 71 234 5678");
  const [email, setEmail] = useState("mpho@example.com");

  const handleSave = () => {
    Alert.alert(
      "Profile Updated",
      "Your profile changes have been saved in this prototype.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Edit Profile</Text>

            <Text style={styles.headerSubtitle}>
              Keep your account details up to date.
            </Text>
          </View>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>

          <TouchableOpacity
            style={styles.changePhotoButton}
            activeOpacity={0.8}
          >
            <Text style={styles.changePhotoText}>Change photo</Text>
          </TouchableOpacity>

          <Text style={styles.photoNote}>
            Profile photo changes are visual-only in this prototype.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Personal information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>First name</Text>

            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              placeholderTextColor="#8A96A8"
              style={styles.input}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Last name</Text>

            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="Enter your last name"
              placeholderTextColor="#8A96A8"
              style={styles.input}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone number</Text>

            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="+27 00 000 0000"
              placeholderTextColor="#8A96A8"
              style={styles.input}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#8A96A8"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.accountCard}>
          <View style={styles.accountIcon}>
            <Text style={styles.accountIconText}>✓</Text>
          </View>

          <View style={styles.accountTextContainer}>
            <Text style={styles.accountTitle}>Account information</Text>

            <Text style={styles.accountDescription}>
              Your personal information helps RideGo keep your rider account
              accurate and secure.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>RideGo • Profile settings</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  backButtonText: {
    fontSize: 32,
    lineHeight: 34,
    color: "#071A3D",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 29,
    fontWeight: "800",
    color: "#071A3D",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#718096",
    marginTop: 5,
    lineHeight: 20,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#D9F1FF",
  },

  avatarText: {
    fontSize: 38,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  changePhotoButton: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#E3F6FF",
  },

  changePhotoText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#087BB8",
  },

  photoNote: {
    fontSize: 12,
    color: "#8A96A8",
    textAlign: "center",
    marginTop: 8,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 20,
  },

  inputGroup: {
    marginBottom: 18,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#46546A",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#DCE4EF",
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 15,
    color: "#071A3D",
    backgroundColor: "#FAFCFF",
  },

  accountCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#071A3D",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  accountIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  accountIconText: {
    fontSize: 19,
    fontWeight: "900",
    color: "#071A3D",
  },

  accountTextContainer: {
    flex: 1,
  },

  accountTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  accountDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#C9D6E8",
  },

  saveButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
  },

  cancelButton: {
    height: 52,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#D5DFEC",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#46546A",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9AA6B6",
    marginTop: 25,
  },
});
