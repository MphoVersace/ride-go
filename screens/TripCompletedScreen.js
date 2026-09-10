import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

export default function TripCompletedScreen({ navigation, route }) {
  const selectedRide = route?.params?.selectedRide || {
    id: "economy",
    name: "Economy",
    description: "Affordable everyday rides",
    eta: "3–5 min",
    price: "R45",
    icon: "🚗",
  };

  const [rating, setRating] = useState(0);

  const ratingLabels = {
    1: "Poor",
    2: "Could be better",
    3: "Good",
    4: "Great",
    5: "Excellent",
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.successCircle}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.completedLabel}>TRIP COMPLETED</Text>

        <Text style={styles.title}>You’ve arrived 🎉</Text>

        <Text style={styles.subtitle}>
          Thanks for riding with RideGo. We hope you had a safe and comfortable
          trip.
        </Text>

        {/* Trip Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryLabel}>YOUR RIDE</Text>
              <Text style={styles.rideName}>{selectedRide.name}</Text>
            </View>

            <View style={styles.rideBadge}>
              <Text style={styles.rideBadgeIcon}>{selectedRide.icon}</Text>
              <Text style={styles.rideBadgeText}>{selectedRide.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.locationRow}>
            <View style={styles.locationDotPickup} />

            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>PICKUP</Text>
              <Text style={styles.locationText}>Your current location</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.locationRow}>
            <View style={styles.locationDotDestination} />

            <View style={styles.locationContent}>
              <Text style={styles.locationLabel}>DESTINATION</Text>
              <Text style={styles.locationText}>Rosebank Mall</Text>
            </View>
          </View>
        </View>

        {/* Fare Card */}
        <View style={styles.fareCard}>
          <View>
            <Text style={styles.fareLabel}>TOTAL FARE</Text>
            <Text style={styles.fareAmount}>{selectedRide.price}</Text>
          </View>

          <View style={styles.fareDetails}>
            <Text style={styles.fareDetailText}>Estimated fare</Text>
            <Text style={styles.fareDetailText}>12 min trip</Text>
          </View>
        </View>

        {/* Driver */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>TM</Text>
          </View>

          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Thabo M.</Text>
            <Text style={styles.driverRating}>★ 4.9 • 1,240 trips</Text>
          </View>

          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>COMPLETED</Text>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>How was your ride?</Text>

          <Text style={styles.ratingSubtitle}>
            Rate your experience with Thabo
          </Text>

          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => setRating(star)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.star, star <= rating && styles.starSelected]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <Text style={styles.ratingSelectedText}>
              {ratingLabels[rating]}
            </Text>
          )}
        </View>

        {/* Safety / Support */}
        <View style={styles.supportCard}>
          <View style={styles.supportIcon}>
            <Text style={styles.supportIconText}>🛡️</Text>
          </View>

          <View style={styles.supportContent}>
            <Text style={styles.supportTitle}>Need help with your trip?</Text>

            <Text style={styles.supportText}>
              You can review your trip details or contact RideGo support if
              something went wrong.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate("RiderHome")}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>Back to home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.receiptButton} activeOpacity={0.8}>
          <Text style={styles.receiptButtonText}>View trip receipt</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 58,
    paddingBottom: 40,
  },

  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 18,
  },

  successIcon: {
    color: "#071A3D",
    fontSize: 38,
    fontWeight: "800",
    marginTop: -2,
  },

  completedLabel: {
    color: "#5BC0FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    textAlign: "center",
    marginBottom: 7,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#AEBBD4",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 24,
  },

  summaryCard: {
    backgroundColor: "#102A55",
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
  },

  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    color: "#7F91B2",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 5,
  },

  rideName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },

  rideBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#173765",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  rideBadgeIcon: {
    fontSize: 15,
    marginRight: 5,
  },

  rideBadgeText: {
    color: "#DCE7F7",
    fontSize: 12,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#25436B",
    marginVertical: 18,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationDotPickup: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
    marginRight: 13,
  },

  locationDotDestination: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
    marginRight: 13,
  },

  locationContent: {
    flex: 1,
  },

  locationLabel: {
    color: "#7F91B2",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 3,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  routeLine: {
    width: 1,
    height: 22,
    backgroundColor: "#5BC0FF",
    marginLeft: 5,
    marginVertical: 4,
  },

  fareCard: {
    backgroundColor: "#F4F8FC",
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fareLabel: {
    color: "#71819C",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 4,
  },

  fareAmount: {
    color: "#071A3D",
    fontSize: 30,
    fontWeight: "800",
  },

  fareDetails: {
    alignItems: "flex-end",
  },

  fareDetailText: {
    color: "#64748B",
    fontSize: 12,
    marginBottom: 5,
  },

  driverCard: {
    backgroundColor: "#102A55",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  driverAvatarText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "800",
  },

  driverInfo: {
    flex: 1,
  },

  driverName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  driverRating: {
    color: "#AEBBD4",
    fontSize: 12,
  },

  completedBadge: {
    backgroundColor: "#173765",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },

  completedBadgeText: {
    color: "#5BC0FF",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  ratingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginBottom: 14,
  },

  ratingTitle: {
    color: "#071A3D",
    fontSize: 20,
    fontWeight: "700",
  },

  ratingSubtitle: {
    color: "#71819C",
    fontSize: 13,
    marginTop: 5,
  },

  starsRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  starButton: {
    paddingHorizontal: 5,
  },

  star: {
    color: "#D8E0EA",
    fontSize: 34,
  },

  starSelected: {
    color: "#5BC0FF",
  },

  ratingSelectedText: {
    color: "#071A3D",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },

  supportCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 18,
  },

  supportIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#173765",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  supportIconText: {
    fontSize: 19,
  },

  supportContent: {
    flex: 1,
  },

  supportTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  supportText: {
    color: "#AEBBD4",
    fontSize: 12,
    lineHeight: 18,
  },

  doneButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  doneButtonText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  receiptButton: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
  },

  receiptButtonText: {
    color: "#5BC0FF",
    fontSize: 15,
    fontWeight: "700",
  },
});
