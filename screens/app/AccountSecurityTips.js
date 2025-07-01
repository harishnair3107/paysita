import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';

const AccountSecurityTips = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={require("../../assets/drawer/StaySafe.png")} style={styles.image} />
                
                <Text style={styles.title}>{t('stay_safe_online')}</Text>
                
                <View style={styles.tipContainer}>
                    <Ionicons name="shield-checkmark" size={24} color="green" />
                    <Text style={styles.tipText}>{t('tip_strong_passwords')}</Text>
                </View>
                <View style={styles.tipContainer}>
                    <Ionicons name="lock-closed" size={24} color="blue" />
                    <Text style={styles.tipText}>{t('tip_2fa')}</Text>
                </View>
                <View style={styles.tipContainer}>
                    <Ionicons name="alert-circle" size={24} color="red" />
                    <Text style={styles.tipText}>{t('tip_suspicious_links')}</Text>
                </View>
                <View style={styles.tipContainer}>
                    <Ionicons name="eye" size={24} color="purple" />
                    <Text style={styles.tipText}>{t('tip_check_activity')}</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default AccountSecurityTips;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 16,
    },
    content: {
        padding: 20,
        alignItems: "center",
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    tipContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        width: "100%",
    },
    tipText: {
        fontSize: 16,
        marginLeft: 10,
        flexWrap: "wrap",
        flexShrink: 1, 
    },
});
