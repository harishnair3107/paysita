import React, { useState, useContext, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../theme/Theme";

// Transaction status constants
const TRANSACTION_STATUS = {
  SUCCESS: "success",
  PENDING: "pending",
  FAILED: "failed",
};

// Transaction type constants
const TRANSACTION_TYPE = {
  CREDIT: "credit",
  DEBIT: "debit",
};

// Mock data - Replace with your API call
const MOCK_TRANSACTIONS = [
  {
    id: "txn_001",
    title: "Payment Received",
    description: "From John Doe",
    amount: 1250.0,
    type: TRANSACTION_TYPE.CREDIT,
    status: TRANSACTION_STATUS.SUCCESS,
    date: "2026-01-30T10:30:00Z",
    icon: "arrow-down-circle",
  },
  {
    id: "txn_002",
    title: "Shopping",
    description: "Amazon Purchase",
    amount: 89.99,
    type: TRANSACTION_TYPE.DEBIT,
    status: TRANSACTION_STATUS.SUCCESS,
    date: "2026-01-29T15:45:00Z",
    icon: "cart",
  },
  {
    id: "txn_003",
    title: "Cashback Earned",
    description: "Reward Points",
    amount: 25.5,
    type: TRANSACTION_TYPE.CREDIT,
    status: TRANSACTION_STATUS.SUCCESS,
    date: "2026-01-29T09:20:00Z",
    icon: "gift",
  },
  {
    id: "txn_004",
    title: "Bill Payment",
    description: "Electricity Bill",
    amount: 156.75,
    type: TRANSACTION_TYPE.DEBIT,
    status: TRANSACTION_STATUS.PENDING,
    date: "2026-01-28T14:10:00Z",
    icon: "flash",
  },
  {
    id: "txn_005",
    title: "Transfer",
    description: "To Sarah Smith",
    amount: 500.0,
    type: TRANSACTION_TYPE.DEBIT,
    status: TRANSACTION_STATUS.SUCCESS,
    date: "2026-01-28T11:00:00Z",
    icon: "arrow-up-circle",
  },
  {
    id: "txn_006",
    title: "Refund",
    description: "Order Cancellation",
    amount: 45.0,
    type: TRANSACTION_TYPE.CREDIT,
    status: TRANSACTION_STATUS.SUCCESS,
    date: "2026-01-27T16:30:00Z",
    icon: "return-up-back",
  },
  {
    id: "txn_007",
    title: "Subscription",
    description: "Netflix Monthly",
    amount: 15.99,
    type: TRANSACTION_TYPE.DEBIT,
    status: TRANSACTION_STATUS.FAILED,
    date: "2026-01-27T08:00:00Z",
    icon: "tv",
  },
  {
    id: "txn_008",
    title: "Salary Deposit",
    description: "Monthly Salary",
    amount: 3500.0,
    type: TRANSACTION_TYPE.CREDIT,
    status: TRANSACTION_STATUS.SUCCESS,
    date: "2026-01-25T00:01:00Z",
    icon: "wallet",
  },
];

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if today
  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Check if yesterday
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // Other dates
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// Transaction Item Component
const TransactionItem = React.memo(({ item, onPress, colors }) => {
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const isCredit = item.type === TRANSACTION_TYPE.CREDIT;
  const isPending = item.status === TRANSACTION_STATUS.PENDING;
  const isFailed = item.status === TRANSACTION_STATUS.FAILED;

  const amountColor = isFailed
    ? "#EF4444"
    : isPending
    ? "#F59E0B"
    : isCredit
    ? "#10B981"
    : "#1E1E1E";

  const iconBackgroundColor = isFailed
    ? "rgba(239, 68, 68, 0.1)"
    : isPending
    ? "rgba(245, 158, 11, 0.1)"
    : isCredit
    ? "rgba(16, 185, 129, 0.1)"
    : "rgba(79, 70, 229, 0.1)";

  const iconColor = isFailed
    ? "#EF4444"
    : isPending
    ? "#F59E0B"
    : isCredit
    ? "#10B981"
    : "#4F46E5";

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(item);
    }
  }, [onPress, item]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.transactionItem,
        pressed && styles.transactionItemPressed,
      ]}
      onPress={handlePress}
      android_ripple={{ color: "rgba(0, 0, 0, 0.05)" }}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
        <Ionicons name={item.icon} size={22} color={iconColor} />
      </View>

      <View style={styles.transactionContent}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {isPending && (
            <View style={styles.pendingBadge}>
              <Text style={styles.pendingText}>Pending</Text>
            </View>
          )}
          {isFailed && (
            <View style={styles.failedBadge}>
              <Text style={styles.failedText}>Failed</Text>
            </View>
          )}
        </View>

        <Text style={styles.transactionDescription} numberOfLines={1}>
          {item.description}
        </Text>

        <Text style={styles.transactionDate}>{formatDate(item.date)}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {isCredit ? "+" : "-"} {formatCurrency(item.amount)}
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </Pressable>
  );
});

TransactionItem.displayName = "TransactionItem";

// Filter Chip Component
const FilterChip = React.memo(({ label, selected, onPress, colors }) => {
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      style={[styles.filterChip, selected && styles.filterChipSelected]}
      onPress={onPress}
      android_ripple={{ color: "rgba(79, 70, 229, 0.2)" }}
    >
      <Text
        style={[styles.filterChipText, selected && styles.filterChipTextSelected]}
      >
        {label}
      </Text>
    </Pressable>
  );
});

FilterChip.displayName = "FilterChip";

// Empty State Component
const EmptyState = ({ colors }) => {
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="receipt-outline" size={80} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>No Transactions Yet</Text>
      <Text style={styles.emptyDescription}>
        Your transaction history will appear here
      </Text>
    </View>
  );
};

// Main Transaction History Component
const History = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => createStyles(colors), [colors]);

  // State
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter options
  const filterOptions = useMemo(
    () => [
      { id: "all", label: "All" },
      { id: "credit", label: "Credit" },
      { id: "debit", label: "Debit" },
      { id: "pending", label: "Pending" },
    ],
    []
  );

  // Filter transactions based on selected filter
  const filteredTransactions = useMemo(() => {
    if (selectedFilter === "all") return MOCK_TRANSACTIONS;
    if (selectedFilter === "credit")
      return MOCK_TRANSACTIONS.filter((t) => t.type === TRANSACTION_TYPE.CREDIT);
    if (selectedFilter === "debit")
      return MOCK_TRANSACTIONS.filter((t) => t.type === TRANSACTION_TYPE.DEBIT);
    if (selectedFilter === "pending")
      return MOCK_TRANSACTIONS.filter(
        (t) => t.status === TRANSACTION_STATUS.PENDING
      );
    return MOCK_TRANSACTIONS;
  }, [selectedFilter]);

  // Calculate total balance
  const totalBalance = useMemo(() => {
    return MOCK_TRANSACTIONS.reduce((acc, transaction) => {
      if (transaction.status === TRANSACTION_STATUS.SUCCESS) {
        return transaction.type === TRANSACTION_TYPE.CREDIT
          ? acc + transaction.amount
          : acc - transaction.amount;
      }
      return acc;
    }, 0);
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Handle transaction press
  const handleTransactionPress = useCallback(
    (transaction) => {
      // Navigate to transaction details or show modal
      console.log("Transaction pressed:", transaction);
      // navigation.navigate("TransactionDetails", { transaction });
    },
    [navigation]
  );

  // Handle filter press
  const handleFilterPress = useCallback((filterId) => {
    setSelectedFilter(filterId);
  }, []);

  // Render filter item
  const renderFilterItem = useCallback(
    ({ item }) => (
      <FilterChip
        label={item.label}
        selected={selectedFilter === item.id}
        onPress={() => handleFilterPress(item.id)}
        colors={colors}
      />
    ),
    [selectedFilter, handleFilterPress, colors]
  );

  // Render transaction item
  const renderTransactionItem = useCallback(
    ({ item }) => (
      <TransactionItem
        item={item}
        onPress={handleTransactionPress}
        colors={colors}
      />
    ),
    [handleTransactionPress, colors]
  );

  // Key extractors
  const filterKeyExtractor = useCallback((item) => item.id, []);
  const transactionKeyExtractor = useCallback((item) => item.id, []);

  // Separators
  const FilterSeparator = useCallback(
    () => <View style={styles.filterSeparator} />,
    [styles.filterSeparator]
  );

  const TransactionSeparator = useCallback(
    () => <View style={styles.transactionSeparator} />,
    [styles.transactionSeparator]
  );

  // List header with balance and filters
  const ListHeader = useCallback(() => {
    return (
      <View>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Ionicons name="eye-outline" size={20} color="#6B7280" />
          </View>
          <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceStats}>
              <Ionicons name="arrow-down" size={16} color="#10B981" />
              <Text style={styles.balanceStatsText}>
                +{formatCurrency(2850.5)} income
              </Text>
            </View>
            <View style={styles.balanceStats}>
              <Ionicons name="arrow-up" size={16} color="#EF4444" />
              <Text style={styles.balanceStatsText}>
                -{formatCurrency(762.73)} expense
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <FlatList
            data={filterOptions}
            renderItem={renderFilterItem}
            keyExtractor={filterKeyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={FilterSeparator}
            contentContainerStyle={styles.filtersContent}
          />
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text style={styles.sectionCount}>
            {filteredTransactions.length} {filteredTransactions.length === 1 ? "transaction" : "transactions"}
          </Text>
        </View>
      </View>
    );
  }, [
    totalBalance,
    filterOptions,
    renderFilterItem,
    filterKeyExtractor,
    FilterSeparator,
    filteredTransactions.length,
    styles,
  ]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle="dark-content"
        translucent={false}
      />


      {/* Header */}
      <View style={styles.header}>
  <View style={styles.headerLeft}>
    <Pressable
      style={styles.backButton}
      onPress={() => navigation.goBack()}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
    >
      <Ionicons name="arrow-back" size={24} color={colors.text} />
    </Pressable>
    <View style={styles.headerTitleContainer}>
      <Text style={styles.headerTitle}>History</Text>
      <Text style={styles.headerSubtitle}>Track your activities</Text>
    </View>
  </View>

  <View style={styles.headerRight}>
    <Pressable
      style={styles.headerIconButton}
      onPress={() => {
        // Add search functionality or filter
        console.log("Search/Filter pressed");
      }}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
    >
      <Ionicons name="search-outline" size={22} color="#1E1E1E" />
    </Pressable>
    
    <Pressable
      style={styles.headerIconButton}
      onPress={() => {
        // Add notification or info functionality
        console.log("Notifications pressed");
      }}
      android_ripple={{ color: "rgba(0, 0, 0, 0.1)", borderless: true }}
    >
      <View style={styles.notificationBadge}>
        <View style={styles.badgeDot} />
      </View>
      <Ionicons name="notifications-outline" size={22} color="#1E1E1E" />
    </Pressable>
  </View>
</View>

      {/* Transactions List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransactionItem}
          keyExtractor={transactionKeyExtractor}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={<EmptyState colors={colors} />}
          ItemSeparatorComponent={TransactionSeparator}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#4F46E5"]}
              tintColor="#4F46E5"
            />
          }
          // Performance optimizations
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={50}
        />
      )}
    </SafeAreaView>
  );
};

export default History;

// Stylesheet
const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.background,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#F3F4F6",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 2,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
      
    },
    headerTitleContainer: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      letterSpacing: 0.2,
    },
    headerSubtitle: {
      fontSize: 12,
      fontWeight: "500",
      color: colors.upi,
      marginTop: 2,
    },
    headerRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    headerIconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.upi,
      position: "relative",
    },
    notificationBadge: {
      position: "absolute",
      top: 8,
      right: 8,
      zIndex: 1,
    },
    badgeDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#EF4444",
      borderWidth: 1.5,
      borderColor: "#EF4444",
    },

    searchButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    listContent: {
      flexGrow: 1,
      paddingBottom: 16,
    },
    balanceCard: {
      margin: 16,
      padding: 20,
      borderRadius: 20,
      backgroundColor: colors.option,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    balanceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    balanceLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: "#6B7280",
      letterSpacing: 0.2,
    },
    balanceAmount: {
      fontSize: 36,
      fontWeight: "800",
      color: "#1E1E1E",
      letterSpacing: -0.5,
      marginBottom: 16,
    },
    balanceFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    balanceStats: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    balanceStatsText: {
      fontSize: 13,
      fontWeight: "500",
      color: "#6B7280",
    },
    filtersSection: {
      marginBottom: 8,
    },
    filtersContent: {
      paddingHorizontal: 16,
    },
    filterSeparator: {
      width: 8,
    },
    filterChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: "#F3F4F6",
      borderWidth: 1,
      borderColor: "transparent",
    },
    filterChipSelected: {
      backgroundColor: "#4F46E5",
      borderColor: "#4F46E5",
    },
    filterChipText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#6B7280",
    },
    filterChipTextSelected: {
      color: "#FFFFFF",
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#1E1E1E",
      letterSpacing: 0.2,
    },
    sectionCount: {
      fontSize: 13,
      fontWeight: "500",
      color: "#9CA3AF",
    },
    transactionItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      marginHorizontal: 16,
      borderRadius: 16,
      backgroundColor: colors.option,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 2,
    },
    transactionItemPressed: {
      opacity: 0.7,
      transform: [{ scale: 0.98 }],
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    transactionContent: {
      flex: 1,
      justifyContent: "center",
    },
    transactionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
      gap: 8,
    },
    transactionTitle: {
      fontSize: 15,
      fontWeight: "600",
      color: "#1E1E1E",
      letterSpacing: 0.1,
      flex: 1,
    },
    transactionDescription: {
      fontSize: 13,
      fontWeight: "400",
      color: "#6B7280",
      marginBottom: 4,
    },
    transactionDate: {
      fontSize: 12,
      fontWeight: "400",
      color: "#9CA3AF",
    },
    pendingBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: "rgba(245, 158, 11, 0.1)",
    },
    pendingText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#F59E0B",
    },
    failedBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
    failedText: {
      fontSize: 11,
      fontWeight: "600",
      color: "#EF4444",
    },
    amountContainer: {
      alignItems: "flex-end",
      justifyContent: "center",
      marginLeft: 12,
      gap: 4,
    },
    amount: {
      fontSize: 16,
      fontWeight: "700",
      letterSpacing: 0.2,
    },
    transactionSeparator: {
      height: 8,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 80,
      paddingHorizontal: 32,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyDescription: {
      fontSize: 14,
      fontWeight: "400",
      color: colors.muted,
      textAlign: "center",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 80,
    },
    loadingText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.subtext,
      marginTop: 12,
    },
  });