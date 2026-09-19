import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const helpTopics = [
  {
    id: "rides",
    icon: "🚗",
    title: "Trips & Ride Requests",
    description: "Questions about accepting, completing, or cancelling trips.",
  },
  {
    id: "earnings",
    icon: "💰",
    title: "Earnings & Payments",
    description: "Get help with earnings, fees, and payout information.",
  },
  {
    id: "account",
    icon: "👤",
    title: "Account & Profile",
    description: "Manage your driver profile, vehicle, and account details.",
  },
  {
    id: "documents",
    icon: "📄",
    title: "Documents & Verification",
    description: "Get help with your driver and vehicle documents.",
  },
  {
    id: "safety",
    icon: "🛡️",
    title: "Safety",
    description: "Find help with safety concerns or report an incident.",
  },
];

const quickQuestions = [
  "How do I update my vehicle details?",
  "Why has my payout not arrived?",
  "How do I report a problem with a rider?",
  "How do I update my driver documents?",
];

export default function DriverHelpScreen({ navigation }) {
  const [searchText, setSearchText] = React.useState("");

  const handleTopicPress = (topic) => {
    Alert.alert(
      topic.title,
      `${topic.title} help content will be connected later.`,
    );
  };

  const handleQuickQuestion = (question) => {
    Alert.alert(
      "Help Article",
      `"${question}" help content will be connected later.`,
    );
  };

  const handleContactSupport = () => {
    Alert.alert(
      "Contact Support",
      "RideGo support messaging functionality will be connected later.",
    );
  };

  const handleReportIssue = () => {
    Alert.alert(
      "Report an Issue",
      "Issue reporting functionality will be connected later.",
    );
  };

  const filteredTopics = helpTopics.filter((topic) => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return (
      topic.title.toLowerCase().includes(search) ||
      topic.description.toLowerCase().includes(search)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerLabel}>DRIVER SUPPORT</Text>
            <Text style={styles.headerTitle}>Help & Support</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.heroCard}>
            <View style={styles.heroIconCircle}>
              <Text style={styles.heroIcon}>💬</Text>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>How can we help?</Text>
              <Text style={styles.heroDescription}>
                Find answers, browse support topics, or contact RideGo support.
              </Text>
            </View>
          </View>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>⌕</Text>

            <TextInput
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search help topics"
              placeholderTextColor="#94A3B8"
              returnKeyType="search"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Help Topics</Text>
            <Text style={styles.sectionSubtitle}>
              Choose a topic to find information and support.
            </Text>

            <View style={styles.topicCard}>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic, index) => (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicRow,
                      index !== filteredTopics.length - 1 &&
                        styles.topicRowBorder,
                    ]}
                    onPress={() => handleTopicPress(topic)}
                    activeOpacity={0.75}
                  >
                    <View style={styles.topicIconCircle}>
                      <Text style={styles.topicIcon}>{topic.icon}</Text>
                    </View>

                    <View style={styles.topicContent}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <Text style={styles.topicDescription}>
                        {topic.description}
                      </Text>
                    </View>

                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptySearch}>
                  <Text style={styles.emptySearchIcon}>🔎</Text>
                  <Text style={styles.emptySearchTitle}>
                    No help topics found
                  </Text>
                  <Text style={styles.emptySearchText}>
                    Try searching for another topic.
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Common Questions</Text>

            <View style={styles.questionsCard}>
              {quickQuestions.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.questionRow,
                    index !== quickQuestions.length - 1 &&
                      styles.questionRowBorder,
                  ]}
                  onPress={() => handleQuickQuestion(question)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.questionIcon}>?</Text>

                  <Text style={styles.questionText}>{question}</Text>

                  <Text style={styles.questionChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.supportCard}>
            <View style={styles.supportIconCircle}>
              <Text style={styles.supportIcon}>🎧</Text>
            </View>

            <Text style={styles.supportTitle}>Still need help?</Text>

            <Text style={styles.supportDescription}>
              Our support team can help you with account questions, trips,
              payments, documents, safety concerns, and more.
            </Text>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactSupport}
              activeOpacity={0.85}
            >
              <Text style={styles.contactButtonText}>
                Contact RideGo Support
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.reportCard}
            onPress={handleReportIssue}
            activeOpacity={0.8}
          >
            <View style={styles.reportIconCircle}>
              <Text style={styles.reportIcon}>⚠️</Text>
            </View>

            <View style={styles.reportContent}>
              <Text style={styles.reportTitle}>Report an Issue</Text>
              <Text style={styles.reportDescription}>
                Report a problem or tell us about something that needs
                attention.
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>

            <Text style={styles.infoText}>
              Help articles, support messaging, issue reporting, and other
              support services are currently represented as UI experiences.
              These features will be connected during the application
              integration stage.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.backButtonBottom}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonBottomText}>Back to Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EEF5",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F1F6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 36,
    color: "#123B5D",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#5D7182",
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#123B5D",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6FF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#CFEAFF",
  },

  heroIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  heroIcon: {
    fontSize: 27,
  },

  heroContent: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123B5D",
    marginBottom: 5,
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#527087",
  },

  searchContainer: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DCE6EE",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 24,
  },

  searchIcon: {
    fontSize: 27,
    color: "#647B8B",
    marginRight: 9,
    marginTop: -3,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#18384F",
    paddingVertical: 0,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123B5D",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6B7F8E",
    marginBottom: 12,
  },

  topicCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4ECF2",
    overflow: "hidden",
  },

  topicRow: {
    minHeight: 88,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  topicRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F4",
  },

  topicIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF7FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  topicIcon: {
    fontSize: 20,
  },

  topicContent: {
    flex: 1,
    paddingRight: 10,
  },

  topicTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 4,
  },

  topicDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#6A7D8C",
  },

  chevron: {
    fontSize: 28,
    color: "#9BAAB5",
    marginLeft: 4,
  },

  emptySearch: {
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  emptySearchIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  emptySearchTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 4,
  },

  emptySearchText: {
    fontSize: 12,
    color: "#718392",
  },

  questionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4ECF2",
    overflow: "hidden",
  },

  questionRow: {
    minHeight: 58,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  questionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F4",
  },

  questionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EAF6FF",
    color: "#176B9C",
    textAlign: "center",
    lineHeight: 28,
    fontSize: 14,
    fontWeight: "900",
    marginRight: 11,
  },

  questionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: "#526A7A",
    paddingRight: 10,
  },

  questionChevron: {
    fontSize: 25,
    color: "#9BAAB5",
  },

  supportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E4ECF2",
  },

  supportIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF7FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },

  supportIcon: {
    fontSize: 22,
  },

  supportTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 5,
  },

  supportDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#687D8C",
    marginBottom: 16,
  },

  contactButton: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: "#123B5D",
    justifyContent: "center",
    alignItems: "center",
  },

  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  reportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4ECF2",
    padding: 15,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  reportIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFF7E8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  reportIcon: {
    fontSize: 20,
  },

  reportContent: {
    flex: 1,
    paddingRight: 8,
  },

  reportTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 4,
  },

  reportDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#6A7D8C",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0F7FB",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCEBF4",
  },

  infoIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#587184",
  },

  backButtonBottom: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: "#123B5D",
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonBottomText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
