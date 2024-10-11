import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Logo from './assets/logo.svg';
import colors from './colors';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initStripe, useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import Nav from './nav';
import config from './config';

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
                publishableKey: config.CLIENT_PUBLISHABLE_KEY,
            });
        }
        initialize().catch(console.error);
    }, []);

    if (!fontsLoaded) {
        return null; // Return null while fonts are loading
    }


    // Start & create a payment intent
    const fetchPaymentIntent = async () => {
        try {
            const amountInCents = parseFloat(amount) * 100;
            const response = await fetch(`${config.SERVER}/payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: parseInt(amountInCents),
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

    // proceed to confirmation form after the amount and currency is entered at renderForm()
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


    // handle payment confirmation and calls payment-confirm api to query an entry to SQL database. Resets all value and display renderForm again
    const handlePayment = async () => {
        if (!clientSecret) {
            Alert.alert('Error', 'Payment Intent not created. Fetch client secret first.');
            return;
        }

        // Initialize the Payment Sheet
        const { error: initError } = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: 'Orangutan Osis',
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
            // Confirm the payment with the server
            try {
                const response = await fetch(`${config.SERVER}/payment-confirm`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ clientSecret, amount }), // Send the clientSecret for confirmation
                });

                if (!response.ok) {
                    throw new Error('Failed to confirm payment.');
                }
            }
            catch (error){
                console.error('Error confirming payment:', error);
                Alert.alert('Error', 'Failed to confirm payment. Please try again.');
            }


            // Optionally reset the form here
            setStep(1);
            setAmount('');
            setCurrency('');
            setClientSecret(null);
        }
    };


    // renderForm(): the initial form for donation (letting user enter amount and currency type)
    const renderForm = () => (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Amount (e.g. 100)"
                placeholderTextColor='white'
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                style={styles.input}
            />


            <Picker
                selectedValue={currency}
                onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}
                style={styles.input}
            >
                <Picker.Item label="Select a currency" value="" />
                <Picker.Item label="USD" value="usd" />
                <Picker.Item label="MYR" value="myr" />
            </Picker>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleProceedToConfirmation()}
                disabled={!amount || !currency}
            >
                <Text style={[styles.text, styles.buttonText]}>Proceed to Confirmation</Text>
            </TouchableOpacity>
        </View>
    );


    // renderConfirmation(): lets user view what they entered, and deciding to confirm or go back. 
    //      - confirm: will call handlePayment()
    //      - go back: will go back and display renderForm()
    const renderConfirmation = () => (
        <View style={{ padding: 20 }}>
            <Text style={[styles.text, styles.headerText]}>Confirmation:</Text>
            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.textTitle]}>Amount: </Text> 
                <Text style={styles.text}>{amount}</Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.text, styles.textTitle]}>Currency: </Text>
                <Text style={styles.text}>{currency.toUpperCase()}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.back]}
                    onPress={() => setStep(1)}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.confirm]}
                    onPress={handlePayment}>
                    <Text style={styles.buttonText}>Confirm & Pay</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        color: colors.primary,
        fontSize: 40,
        fontFamily: 'Alike',
    },
    input: { 
        color: colors.text, 
        height: 40, 
        borderColor: colors.primary, 
        borderWidth: 1, 
        marginTop: 20,
        paddingLeft: 20,
        fontFamily: 'SegoeUI',
    },
    headerText: {
        color: colors.secondary,
        fontSize: 25,
        marginTop: 20,
        marginBottom: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    textTitle: {
        color: colors.secondary,
        fontSize: 18,
    },
    text: {
        color: colors.text,
        fontFamily: 'SegoeUI',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        marginTop: 30,
        padding: 15,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row', // Display buttons in a row
        justifyContent: 'space-between', // Space the buttons evenly
        alignItems: 'center',
        height: 250, // Ensure the container has enough height
    },
    confirm: {
        width: '45%',
    },
    back: {
        width: '45%',
    },
    buttonText: {
        color: colors.accent,
        fontSize: 18,
    },
});

export default DonationScreen;