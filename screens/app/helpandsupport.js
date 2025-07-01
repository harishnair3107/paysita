import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const HelpAndSupport = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const initialQuestions = [
    { id: '1', question_key: 'q_recharge_mobile', answer_key: 'a_recharge_mobile', next: ['Recharge options', 'Back to main'] },
    { id: '2', question_key: 'q_loan_status', answer_key: 'a_loan_status', next: ['Repayment methods', 'Back to main'] },
    { id: '3', question_key: 'q_refer_earn', answer_key: 'a_refer_earn', next: ['Referral rewards', 'Back to main'] },
    { id: '4', question_key: 'q_upi_pin', answer_key: 'a_upi_pin', next: ['Forgot UPI PIN?', 'UPI PIN security tips', 'Back to main'] },
    { id: '5', question_key: 'q_electricity_bill', answer_key: 'a_electricity_bill', next: ['Bill payment options', 'Back to main'] },
    { id: '6', question_key: 'q_add_wallet_money', answer_key: 'a_add_wallet_money', next: ['Wallet funding methods', 'Back to main'] },
    { id: '7', question_key: 'q_cashback_offers', answer_key: 'a_cashback_offers', next: ['How to claim cashback?', 'Back to main'] },
    { id: '8', question_key: 'q_block_account', answer_key: 'a_block_account', next: ['Report fraud', 'Back to main'] }
  ];

  const [chatHistory, setChatHistory] = useState([]);
  const [currentOptions, setCurrentOptions] = useState(initialQuestions);
  const [previousOptions, setPreviousOptions] = useState([]);

  const handleQuestionSelect = (item) => {
    setChatHistory((prevChat) => [
      ...prevChat,
      { type: 'question', text: t(item.question_key) },
      { type: 'answer', text: t(item.answer_key) }
    ]);

    if (item.next) {
      setPreviousOptions((prev) => [...prev, currentOptions]);
      setCurrentOptions(
        item.next.map((text, index) => ({
          id: `next-${index}`,
          question: text,
          answer: text === 'Back to main' ? t('back_to_main_msg') : t('more_info_about', { text }),
          next: getNextOptions(text),
        }))
      );
    }
  };

  const getNextOptions = (text) => {
    const nextOptionsMap = {
      'Recharge options': ['View plans', 'Auto-recharge setup'],
      'Repayment methods': ['Pay via UPI', 'Pay via Net Banking'],
      'Referral rewards': ['How to withdraw rewards?', 'What are the reward terms?'],
      'Forgot UPI PIN?': ['Reset via Debit Card', 'Reset via Net Banking'],
      'Bill payment options': ['Pay via Wallet', 'Pay via UPI'],
      'Wallet funding methods': ['Add via UPI', 'Add via Net Banking'],
      'How to claim cashback?': ['Cashback delay?', 'Eligible transactions'],
      'Report fraud': ['Contact customer support', 'Secure your account'],
      // other next-options keys...
    };
    let nextOptions = nextOptionsMap[text] || null;
    if (text !== 'Back to main' && previousOptions.length > 0) {
      nextOptions = nextOptions ? [...nextOptions, 'Back'] : ['Back'];
    }
    return nextOptions;
  };

  const handleBack = () => {
    if (previousOptions.length > 0) {
      const lastOptions = previousOptions.pop();
      setCurrentOptions(lastOptions);
      setPreviousOptions([...previousOptions]);
    } else {
      setCurrentOptions(initialQuestions);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <View style={styles.container}>
        <Text style={styles.helpText}>{t('help_text')}</Text>

        <ScrollView style={styles.chatContainer} ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          {chatHistory.map((msg, index) => (
            <View
              key={index}
              style={[styles.messageBox, msg.type === 'question' ? styles.questionBox : styles.answerBox]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.optionsContainer}>
          <View style={styles.optionsGrid}>
            {currentOptions.filter(item => item.question_key).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.optionButton}
                onPress={() => handleQuestionSelect(item)}
              >
                <Text style={styles.optionText}>{t(item.question_key)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {previousOptions.length > 0 && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.optionText}>{t('back')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};


export default HelpAndSupport;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f7fc",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1c1c1e",
    marginLeft: 14,
  },
  helpText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#555",
    paddingHorizontal: 20,
    paddingVertical: 12,
    lineHeight: 24,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#f0f6ff",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  messageBox: {
    maxWidth: "75%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  questionBox: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
    borderTopRightRadius: 0,
  },
  answerBox: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 0,
    borderWidth: 0.5,
    borderColor: "#dfe6f0",
  },
  messageText: {
    fontSize: 15,
    color: "#1e1e1e",
    lineHeight: 21,
  },
  optionsContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 8,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  optionButton: {
    backgroundColor: "#007aff",
    paddingVertical: 14,
    paddingHorizontal: 10,
    width: "48%",
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#ff3b30",
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
});