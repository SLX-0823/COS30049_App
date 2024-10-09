import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert } from 'react-native';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initStripe, useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from './nav';
import API from './apiConfig';

// Replace with your actual publishable key
const PUBLIC_KEY = 'pk_test_51Q7Vg4FJbGru8hWsdZPXnrROebwctEkPFPMMf8WPZU7Rnfrfolj1a6sJ4hWxOW5j18E8cU9Djr3WnlmLhLR2UtoQ00ZpPEuVWV';

SplashScreen.preventAutoHideAsync();

const DonationScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [clientSecret, setClientSecret] = useState(null);
    const [step, setStep] = useState(1);
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useEffect(() => {
        async function loadFontsAndHideSplash() {
            try {
                await Font.loadAsync({
                    'Alike': require('./assets/fonts/Alike-Regular.ttf'),
                    'SegoeUI': require('./assets/fonts/Segoe UI.ttf'),
                });
                setFontsLoaded(true);
                await SplashScreen.hideAsync();
            } catch (error) {
                console.warn(error);
            }
        }
        loadFontsAndHideSplash();
    }, []);

    useEffect(() => {
        async function initialize() {
            await initStripe({
                publishableKey: PUBLIC_KEY,
            });
        }
        initialize().catch(console.error);
    }, []);

    if (!fontsLoaded) {
        return null; // Return null while fonts are loading
    }

    const fetchPaymentIntent = async () => {
        try {
            console.log('Fetching client secret...');
            const response = await fetch(`${API}/payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseInt(amount),
                    currency: currency.toLowerCase(),
                }),
            });

            const { clientSecret } = await response.json();
            setClientSecret(clientSecret);
            return clientSecret; // Return client secret for later use
        } catch (error) {
            console.error('Error fetching PaymentIntent:', error);
            Alert.alert('Error', 'Failed to fetch payment intent. Please try again.');
        }
    };

    const handleProceedToConfirmation = async () => {
        if (amount && currency) {
            const secret = await fetchPaymentIntent(); // Fetch the payment intent and move to step 2
            if (secret) {
                setStep(2);
            }
        } else {
            Alert.alert('Error', 'Please fill in all required fields correctly.');
        }
    };

    const handlePayment = async () => {
        if (!clientSecret) {
            Alert.alert('Error', 'Payment Intent not created. Fetch client secret first.');
            return;
        }

        // Initialize the Payment Sheet
        const { error: initError } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'Monke',
        });

        if (initError) {
            Alert.alert('Error', initError.message);
            return;
        }

        // Present the Payment Sheet
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
            Alert.alert('Payment failed', presentError.message);
        } else {
            Alert.alert('Payment successful', 'Your payment has been confirmed!');
            // Optionally reset the form here
            setStep(1);
            setAmount('');
            setCurrency('');
            setClientSecret(null);
        }
    };

    const renderForm = () => (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Amount (e.g., 1000 for $10)"
                placeholderTextColor='white'
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={{ color: 'white', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Currency (e.g., 'usd')"
                placeholderTextColor='white'
                value={currency}
                onChangeText={setCurrency}
                style={{ color: 'white', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            />

            <TouchableOpacity
                onPress={() => handleProceedToConfirmation()}
                disabled={!amount || !currency}
            >
                <Text style={{ color: 'white' }}>Proceed to Confirmation</Text>
            </TouchableOpacity>
        </View>
    );

    const renderConfirmation = () => (
        <View style={{ padding: 20 }}>
            <Text style={{ color: 'white' }}>Confirm your donation:</Text>
            <Text style={{ color: 'white' }}>Amount: {amount}</Text>
            <Text style={{ color: 'white' }}>Currency: {currency.toUpperCase()}</Text>

            <TouchableOpacity onPress={handlePayment}>
                <Text style={{ color: 'white' }}>Confirm and Pay</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep(1)}>
                <Text style={{ color: 'white' }}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Nav />
                <View style={styles.logo}>
                    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
                        <Logo width={100} height={100} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.main}>
                <Text style={styles.title}>Donation</Text>
                {step === 1 ? renderForm() : renderConfirmation()}
            </View>
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -10,
        padding: 0,
        backgroundColor: colors.background,
    },
    headerContainer: {
        marginTop: 30,
        minWidth: '100%',
        flex: 1,
        flexDirection: 'row',
        marginBottom: -150,
        backgroundColor: colors.background,
        zIndex: 999,
        position: 'absolute',
        alignContent: 'center',
        borderStyle: 'solid',
        borderColor: colors.secondary,
        borderBottomWidth: 0.2,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 50,
    },
    header: {
        marginTop: 30,
        fontSize: 35,
        color: colors.text,
        fontFamily: 'Alike',
    },
    main: {
        marginTop: 130,
        padding: 10,
    },
    text: {
        color: colors.text,
    },
});

export default DonationScreen;