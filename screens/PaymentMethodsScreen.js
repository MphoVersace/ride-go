
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const paymentMethods = [
  {
    id: "card",
    type: "card",
    title: "Visa",
    subtitle: "•••• 4242",
    detail: "Debit card",
    icon: "💳",
    isDefault: true,
  },
  {
    id: "cash",
    type: "cash",
    title: "Cash",
    subtitle: "Pay your driver in cash",
    detail: "Available for eligible rides",
    icon: "💵",
    isDefault: false,
  },
];

export default function PaymentMethodsScreen({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Payment Methods</Text>
            <Text style={styles.headerSubtitle}>
              Choose how you want to pay
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Text style={styles.heroIconText}>💳</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Your payments</Text>
            <Text style={styles.heroDescription}>
              Manage your preferred way to pay for RideGo trips.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available payment methods</Text>

          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{paymentMethods.length}</Text>
          </View>
        </View>

        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentCard,
                isSelected && styles.paymentCardSelected,
              ]}
              activeOpacity={0.85}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.paymentIcon}>
                <Text style={styles.paymentIconText}>{method.icon}</Text>
              </View>

              <View style={styles.paymentContent}>
                <View style={styles.paymentTitleRow}>
                  <Text style={styles.paymentTitle}>{method.title}</Text>

                  {method.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>DEFAULT</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.paymentSubtitle}>{method.subtitle}</Text>
                <Text style={styles.paymentDetail}>{method.detail}</Text>
              </View>

              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={styles.addMethodCard}
          activeOpacity={0.85}
          onPress={() => {}}
        >
          <View style={styles.addIcon}>
            <Text style={styles.addIconText}>+</Text>
          </View>

          <View style={styles.addTextContainer}>
            <Text style={styles.addTitle}>Add payment method</Text>
            <Text style={styles.addSubtitle}>
              Add another card or payment option
            </Text>
          </View>

          <Text style={styles.addArrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>🔒</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Your payment information</Text>
            <Text style={styles.infoDescription}>
              Payment details are shown as prototype data for the RideGo
              interface. Real payment processing will be connected later.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          RideGo • Fast, Safe, Reliable
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#102957",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    color: "#9FB4D8",
    fontSize: 13,
    marginTop: 4,
  },

  heroCard: {
    backgroundColor: "#102957",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#1D3A70",
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#17366B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  heroIconText: {
    fontSize: 28,
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
  },

  heroDescription: {
    color: "#AFC1DE",
    fontSize: 13,
    lineHeight: 19,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  countBadge: {
    minWidth: 30,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#17366B",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 9,
  },

  countBadgeText: {
    color: "#5BC0FF",
    fontSize: 12,
    fontWeight: "800",
  },

  paymentCard: {
    backgroundColor: "#102957",
    borderRadius: 20,
    padding: 17,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1D3A70",
  },

  paymentCardSelected: {
    borderColor: "#5BC0FF",
    backgroundColor: "#112F5F",
  },

  paymentIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#17366B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  paymentIconText: {
    fontSize: 24,
  },

  paymentContent: {
    flex: 1,
  },

  paymentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 4,
  },

  paymentTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },

  defaultBadge: {
    backgroundColor: "#5BC0FF",
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  defaultBadgeText: {
    color: "#071A3D",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  paymentSubtitle: {
    color: "#D5E2F5",
    fontSize: 13,
    marginBottom: 3,
  },

  paymentDetail: {
    color: "#829BC3",
    fontSize: 11,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#5D78A4",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  radioOuterSelected: {
    borderColor: "#5BC0FF",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5BC0FF",
  },

  addMethodCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#36527F",
    borderStyle: "dashed",
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 20,
  },

  addIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#17366B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  addIconText: {
    color: "#5BC0FF",
    fontSize: 28,
    fontWeight: "300",
    marginTop: -2,
  },

  addTextContainer: {
    flex: 1,
  },

  addTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },

  addSubtitle: {
    color: "#829BC3",
    fontSize: 11,
  },

  addArrow: {
    color: "#5BC0FF",
    fontSize: 28,
    fontWeight: "300",
    marginLeft: 8,
  },

  infoCard: {
    backgroundColor: "#0D2248",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#193765",
    marginBottom: 20,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#17366B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoIconText: {
    fontSize: 19,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
  },

  infoDescription: {
    color: "#8FA8CE",
    fontSize: 11,
    lineHeight: 17,
  },

  homeButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  homeButtonText: {
    color: "#071A3D",
    fontSize: 15,
    fontWeight: "900",
  },

  footerText: {
    color: "#5D78A4",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 4,
  },
});
