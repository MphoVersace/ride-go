import { colors } from "../ui/theme";
import { KeyboardField, KeyboardFormScroll } from "../ui/KeyboardForm";
import Icon from "../ui/Icon";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function DestinationSearchScreen({ navigation }) {
  const openResults = () => {
    navigation.navigate("DestinationResults");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Choose destination</Text>

        <View style={styles.headerSpacer} />
      </View>

      <KeyboardFormScroll
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Where are you going?</Text>

        <Text style={styles.description}>
          Search for a destination or choose one of your saved places.
        </Text>

        <TouchableOpacity
          style={styles.searchContainer}
          activeOpacity={0.9}
          onPress={openResults}
        >
          <View style={styles.searchIconCircle}>
            <Text style={styles.searchIcon}>⌕</Text>
          </View>

          <KeyboardField
            style={styles.searchInput}
            placeholder="Search for a place"
            placeholderTextColor={colors.muted}
            autoCapitalize="words"
            autoCorrect={false}
            onFocus={openResults}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.currentLocationCard}
          activeOpacity={0.85}
          onPress={openResults}
        >
          <View style={styles.locationIconCircle}>
            <Icon name="pin" style={styles.locationIcon} />
          </View>

          <View style={styles.locationText}>
            <Text style={styles.locationTitle}>Use current location</Text>

            <Text style={styles.locationSubtitle}>
              Start your ride from here
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Saved places</Text>

        <TouchableOpacity
          style={styles.placeCard}
          activeOpacity={0.85}
          onPress={openResults}
        >
          <View style={styles.placeIconCircle}>
            <Icon name="home" style={styles.placeIcon} />
          </View>

          <View style={styles.placeText}>
            <Text style={styles.placeTitle}>Home</Text>

            <Text style={styles.placeSubtitle}>Add your home address</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.placeCard}
          activeOpacity={0.85}
          onPress={openResults}
        >
          <View style={styles.placeIconCircle}>
            <Icon name="work" style={styles.placeIcon} />
          </View>

          <View style={styles.placeText}>
            <Text style={styles.placeTitle}>Work</Text>

            <Text style={styles.placeSubtitle}>Add your work address</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Recent destinations</Text>

        <View style={styles.emptyState}>
          <Icon name="clock" style={styles.emptyIcon} />

          <Text style={styles.emptyTitle}>No recent destinations</Text>

          <Text style={styles.emptyDescription}>
            Places you visit will appear here for quick access.
          </Text>
        </View>
      </KeyboardFormScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    marginBottom: 28,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 34,
    color: colors.black,
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
  },

  headerSpacer: {
    width: 44,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingBottom: 35,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted,
    marginBottom: 22,
  },

  searchContainer: {
    width: "100%",
    height: 58,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  searchIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  searchIcon: {
    fontSize: 25,
    color: colors.blueInk,
    marginTop: -3,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: colors.black,
  },

  currentLocationCard: {
    width: "100%",
    minHeight: 70,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 28,
  },

  locationIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  locationIcon: {
    fontSize: 19,
  },

  locationText: {
    flex: 1,
  },

  locationTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 3,
  },

  locationSubtitle: {
    fontSize: 12,
    color: colors.muted,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },

  placeCard: {
    width: "100%",
    minHeight: 68,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  placeIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  placeIcon: {
    fontSize: 18,
  },

  placeText: {
    flex: 1,
  },

  placeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 3,
  },

  placeSubtitle: {
    fontSize: 12,
    color: colors.muted,
  },

  arrow: {
    fontSize: 30,
    color: colors.blueInk,
    marginLeft: 8,
  },

  emptyState: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 22,
    marginTop: 2,
  },

  emptyIcon: {
    fontSize: 25,
    marginBottom: 8,
  },

  emptyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 5,
  },

  emptyDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
    textAlign: "center",
  },
});
