import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const savedPlaces = [
  {
    id: "1",
    name: "Home",
    address: "Your saved home address",
    icon: "⌂",
    accent: "home",
  },
  {
    id: "2",
    name: "Work",
    address: "Your saved work address",
    icon: "▣",
    accent: "work",
  },
  {
    id: "3",
    name: "Favourite",
    address: "Your favourite saved destination",
    icon: "★",
    accent: "favourite",
  },
];

export default function SavedPlacesScreen({ navigation }) {
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
            <Text style={styles.headerTitle}>Saved Places</Text>
            <Text style={styles.headerSubtitle}>
              Save destinations you visit often.
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>⌖</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Your favourite places</Text>
            <Text style={styles.heroDescription}>
              Keep your most-used destinations ready for your next RideGo
              journey.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Saved destinations</Text>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>{savedPlaces.length} saved</Text>
          </View>
        </View>

        {savedPlaces.map((place) => (
          <TouchableOpacity
            key={place.id}
            style={styles.placeCard}
            activeOpacity={0.85}
          >
            <View
              style={[
                styles.placeIcon,
                place.accent === "home" && styles.homeIcon,
                place.accent === "work" && styles.workIcon,
                place.accent === "favourite" && styles.favouriteIcon,
              ]}
            >
              <Text
                style={[
                  styles.placeIconText,
                  place.accent === "home" && styles.homeIconText,
                  place.accent === "work" && styles.workIconText,
                  place.accent === "favourite" && styles.favouriteIconText,
                ]}
              >
                {place.icon}
              </Text>
            </View>

            <View style={styles.placeInfo}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.placeAddress}>{place.address}</Text>
            </View>

            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
          <View style={styles.addIcon}>
            <Text style={styles.addIconText}>+</Text>
          </View>

          <View style={styles.addTextContainer}>
            <Text style={styles.addTitle}>Add a saved place</Text>
            <Text style={styles.addDescription}>
              Save another destination for quicker booking.
            </Text>
          </View>

          <Text style={styles.addArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Text style={styles.tipIconText}>i</Text>
          </View>

          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>Quick booking tip</Text>
            <Text style={styles.tipDescription}>
              Saved places will make it faster to enter your destination when
              requesting a ride.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.homeButtonText}>Back to home</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          RideGo • Your favourite destinations
        </Text>
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
    marginBottom: 24,
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

  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#071A3D",
    borderRadius: 22,
    padding: 18,
    marginBottom: 26,
  },

  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  heroIconText: {
    fontSize: 25,
    fontWeight: "900",
    color: "#071A3D",
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#C9D6E8",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#071A3D",
  },

  countBadge: {
    backgroundColor: "#E3F6FF",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 15,
  },

  countText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#087BB8",
  },

  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },

  placeIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  homeIcon: {
    backgroundColor: "#E3F6FF",
  },

  workIcon: {
    backgroundColor: "#EEF0FF",
  },

  favouriteIcon: {
    backgroundColor: "#FFF3D9",
  },

  placeIconText: {
    fontSize: 23,
    fontWeight: "900",
  },

  homeIconText: {
    color: "#087BB8",
  },

  workIconText: {
    color: "#4B55A8",
  },

  favouriteIconText: {
    color: "#C58A00",
  },

  placeInfo: {
    flex: 1,
    paddingRight: 8,
  },

  placeName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  placeAddress: {
    fontSize: 12,
    lineHeight: 17,
    color: "#718096",
  },

  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 13,
    backgroundColor: "#F1F6FB",
  },

  editButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#087BB8",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginTop: 4,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: "#BFE9FF",
    borderStyle: "dashed",
  },

  addIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#E3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  addIconText: {
    fontSize: 27,
    fontWeight: "500",
    color: "#087BB8",
    marginTop: -2,
  },

  addTextContainer: {
    flex: 1,
  },

  addTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 3,
  },

  addDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#718096",
  },

  addArrow: {
    fontSize: 24,
    color: "#087BB8",
    marginLeft: 8,
  },

  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E4EBF3",
  },

  tipIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  tipIconText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#087BB8",
  },

  tipTextContainer: {
    flex: 1,
  },

  tipTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  tipDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#718096",
  },

  homeButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },

  homeButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9AA6B6",
    marginTop: 22,
  },
});
