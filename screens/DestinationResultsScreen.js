import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function DestinationResultsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

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

      <View style={styles.searchContainer}>
        <View style={styles.searchIconCircle}>
          <Text style={styles.searchIcon}>⌕</Text>
        </View>

        <TextInput
          style={styles.searchInput}
          value="Rosebank Mall"
          placeholder="Search for a place"
          placeholderTextColor="#8FA5C1"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.clearButton} activeOpacity={0.8}>
          <Text style={styles.clearText}>×</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.resultsTitle}>Search results</Text>

      <View style={styles.results}>
        <TouchableOpacity
          style={styles.resultCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RideOptions")}
        >
          <View style={styles.resultIconCircle}>
            <Text style={styles.resultIcon}>📍</Text>
          </View>

          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>Rosebank Mall</Text>

            <Text style={styles.resultAddress}>
              15A Cradock Avenue, Rosebank
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resultCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RideOptions")}
        >
          <View style={styles.resultIconCircle}>
            <Text style={styles.resultIcon}>📍</Text>
          </View>

          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>Rosebank Gautrain Station</Text>

            <Text style={styles.resultAddress}>Oxford Road, Rosebank</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resultCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RideOptions")}
        >
          <View style={styles.resultIconCircle}>
            <Text style={styles.resultIcon}>📍</Text>
          </View>

          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>The Zone @ Rosebank</Text>

            <Text style={styles.resultAddress}>Oxford Road, Rosebank</Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resultCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RideOptions")}
        >
          <View style={styles.resultIconCircle}>
            <Text style={styles.resultIcon}>📍</Text>
          </View>

          <View style={styles.resultText}>
            <Text style={styles.resultTitle}>Rosebank Office Park</Text>

            <Text style={styles.resultAddress}>
              21 Tyrwhitt Avenue, Rosebank
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomHint}>
        <Text style={styles.bottomHintIcon}>⌕</Text>

        <Text style={styles.bottomHintText}>
          Can't find your destination? Try searching with a different name.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
    paddingHorizontal: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
    marginBottom: 22,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 34,
    color: "#FFFFFF",
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerSpacer: {
    width: 44,
  },

  searchContainer: {
    width: "100%",
    height: 58,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#5BC0FF",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 28,
  },

  searchIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  searchIcon: {
    fontSize: 25,
    color: "#5BC0FF",
    marginTop: -3,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  clearButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    fontSize: 22,
    color: "#8FA5C1",
    marginTop: -2,
  },

  resultsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },

  results: {
    width: "100%",
  },

  resultCard: {
    width: "100%",
    minHeight: 76,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 11,
  },

  resultIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  resultIcon: {
    fontSize: 19,
  },

  resultText: {
    flex: 1,
    paddingRight: 8,
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  resultAddress: {
    fontSize: 12,
    lineHeight: 17,
    color: "#8FA5C1",
  },

  arrow: {
    fontSize: 30,
    color: "#5BC0FF",
    marginLeft: 5,
  },

  bottomHint: {
    width: "100%",
    backgroundColor: "#102A52",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  bottomHintIcon: {
    fontSize: 22,
    color: "#5BC0FF",
    marginRight: 10,
  },

  bottomHintText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#C9D6E8",
  },
});
