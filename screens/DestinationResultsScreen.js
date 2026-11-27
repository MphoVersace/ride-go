import { colors } from "../ui/theme";
import { useState } from "react";
import { KeyboardField, KeyboardFormScroll } from "../ui/KeyboardForm";
import Icon from "../ui/Icon";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function DestinationResultsScreen({ navigation }) {
  const [query, setQuery] = useState("Rosebank Mall");

  return (
    <KeyboardFormScroll style={styles.container} contentContainerStyle={styles.scrollContent}>
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

      <View style={styles.searchContainer}>
        <View style={styles.searchIconCircle}>
          <Text style={styles.searchIcon}>⌕</Text>
        </View>

        <KeyboardField
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          placeholder="Search for a place"
          placeholderTextColor={colors.muted}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.clearButton} activeOpacity={0.8} onPress={() => setQuery("")} accessibilityLabel="Clear search">
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
            <Icon name="pin" style={styles.resultIcon} />
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
            <Icon name="pin" style={styles.resultIcon} />
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
            <Icon name="pin" style={styles.resultIcon} />
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
            <Icon name="pin" style={styles.resultIcon} />
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
    </KeyboardFormScroll>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

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

  searchContainer: {
    width: "100%",
    height: 58,
    backgroundColor: colors.blueTint,
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
    fontWeight: "600",
  },

  clearButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  clearText: {
    fontSize: 22,
    color: colors.muted,
    marginTop: -2,
  },

  resultsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 12,
  },

  results: {
    width: "100%",
  },

  resultCard: {
    width: "100%",
    minHeight: 76,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
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
    backgroundColor: colors.white,
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
    color: colors.black,
    marginBottom: 4,
  },

  resultAddress: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
  },

  arrow: {
    fontSize: 30,
    color: colors.blueInk,
    marginLeft: 5,
  },

  bottomHint: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  bottomHintIcon: {
    fontSize: 22,
    color: colors.blueInk,
    marginRight: 10,
  },

  bottomHintText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },
});
