import { StyleSheet, Text, View, Pressable, StatusBar, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UpiLite = ({ navigation }) => {
    const { t } = useTranslation();
    const [amount, setAmount] = useState("50");
    const [bank, setBank] = useState("HDFC - 6178");

    const handleAmountPress = (selectedAmount) => {
        setAmount(String(selectedAmount));
    };

    const handlePayment = () => {
        Alert.alert(t('payment'), `${t('adding')} ₹${amount} ${t('using')} ${bank}`);
    };

    const changeBank = () => {
        Alert.alert(t('change_bank'), t('bank_selection_info'));
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
                <Image source={require("../../assets/drawer/upi.png")} style={styles.logo} />
                <Text style={styles.faq}>{t('faqs')}</Text>
            </View>
            
            {/* Title */}
            <Text style={styles.title}>{t('fast_payments')}</Text>
            
            {/* Image Banner */}
            <Image source={require("../../assets/drawer/UPIlogojpg.webp")} style={styles.banner} />
            
            {/* Card Section */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{t('add_money_upi_lite')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('enter_amount')}
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />
                <View style={styles.amountOptions}>
                    {[100, 200, 500, 2000].map((amt) => (
                        <Pressable
                            key={amt}
                            style={[
                                styles.amountButton,
                                amount == amt && styles.selectedAmountButton,
                            ]}
                            onPress={() => handleAmountPress(amt)}
                        >
                            <Text
                                style={[
                                    styles.amountText,
                                    amount == amt && styles.selectedAmountText,
                                ]}
                            >
                                ₹{amt}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Payment Method */}
                <View style={styles.paymentRow}>
                    <Text style={styles.payUsing}>{t('pay_using')}</Text>
                    <Text style={styles.bankName}>{bank}</Text>
                    <Pressable onPress={changeBank}>
                        <Text style={styles.change}>{t('change')}</Text>
                    </Pressable>
                </View>
            </View>
            
            {/* Terms & Button */}
            <Text style={styles.terms}>
                {t('by_proceeding')} <Text style={styles.link}>{t('terms_and_conditions')}</Text>
            </Text>
            <Pressable style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>{t('add')} ₹{amount}</Text>
            </Pressable>
        </View>
    );
};

export default UpiLite;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    logo: {
        width: 80,
        height: 40,
        resizeMode: "contain",
    },
    faq: {
        color: "blue",
        fontWeight: "bold",
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: "#1D154A",
    },
    banner: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginTop: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    amountOptions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    amountButton: {
        backgroundColor: "#e3e3e3",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    selectedAmountButton: {
        backgroundColor: "#FFA500",
    },
    amountText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    selectedAmountText: {
        color: "#fff",
    },
    paymentRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    payUsing: {
        color: "#777",
    },
    bankName: {
        fontWeight: "bold",
    },
    change: {
        color: "blue",
        fontWeight: "bold",
    },
    terms: {
        textAlign: "center",
        marginTop: 20,
        color: "#777",
    },
    link: {
        color: "blue",
    },
    payButton: {
        backgroundColor: "#1D154A",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    payButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});