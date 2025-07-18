import { useNavigation } from '@react-navigation/native';
import React,{useEffect} from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { registerUser, setRegistrationFormField, setError, clearError } from '../../../redux/Slices/authSlice'; // Import specific actions
import Loader from '../../../components/Loader/Loader';
import FitFlixlogo from '../../../assets/fitflixlogo.svg'
import { useToast } from 'react-native-toast-notifications';
export default function RegisterScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast=useToast();
  const { loading, error,user, isAuthenticated } = useSelector((state) => state.auth);
  const {
    name,
    email,
    password,
    confirmPassword,
  } = useSelector((state) => state.auth.registrationForm);

  const handleSetName = (text) => dispatch(setRegistrationFormField({ field: 'name', value: text }));
  const handleSetEmail = (text) => dispatch(setRegistrationFormField({ field: 'email', value: text }));
  const handleSetPassword = (text) => dispatch(setRegistrationFormField({ field: 'password', value: text }));
  const handleSetConfirmPassword = (text) => dispatch(setRegistrationFormField({ field: 'confirmPassword', value: text }));

  const handleClearError = () => dispatch(clearError());

  const validateForm = () => {
    if (!name) {
      dispatch(setError('Please enter your username'));
      return false;
    }
    if (!email) {
      dispatch(setError('Please enter your email'));
      return false;
    }
    if (!password) {
      dispatch(setError('Please enter a password'));
      return false;
    }
    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match'));
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    dispatch(
      registerUser({username:name,email:email,password:password}));
    
  };
 useEffect(() => {
    if (isAuthenticated && user) { // Ensure user data is also present if needed for HomeScreen
      navigation.navigate('Home'); // Navigate to your HomeScreen
    }
  }, [isAuthenticated, user, navigation]); // Depend on isAuthenticated, user, and navigation
console.log(error)
  return (
    <ScrollView style={styles.scrollView}>
      <Loader loading={loading}/>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <FitFlixlogo
            style={styles.logo}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={name}
              onChangeText={(text) => {
                handleSetName(text);
                handleClearError();
              }}
              autoCapitalize="none" // Often usernames are not capitalized automatically
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                handleSetEmail(text);
                handleClearError();
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => {
                handleSetPassword(text);
                handleClearError();
              }}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                handleSetConfirmPassword(text);
                handleClearError();
              }}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.signupButton, loading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={loading}
          >
            <Text style={styles.signupButtonText}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By clicking Sign Up, you agree to our <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.signInLink}> Sign in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}