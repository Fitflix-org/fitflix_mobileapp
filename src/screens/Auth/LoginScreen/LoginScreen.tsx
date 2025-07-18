import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react'; // Import useEffect
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import FitFlixlogo from '../../../assets/fitflixlogo.svg'
import { RootStackParamList } from '../../../../src/navigation/types';
import { loginUser, setLoginFormField, setError, clearError } from '../../../redux/Slices/authSlice';
import Loader from '../../../components/Loader/Loader';

type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const { loading, error, user, isAuthenticated } = useSelector((state) => state.auth); // Destructure isAuthenticated
  const { email, password } = useSelector((state) => state.auth.loginForm);

  const handleSetEmail = (text: string) => dispatch(setLoginFormField({ field: 'email', value: text }));
  const handleSetPassword = (text: string) => dispatch(setLoginFormField({ field: 'password', value: text }));
  const handleClearError = () => dispatch(clearError());

  const handleLogin = async () => {
    if (!email) {
      dispatch(setError('Please enter your email'));
      return;
    }

    if (!password) {
      dispatch(setError('Please enter your password'));
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  // Use useEffect to navigate after successful login
  useEffect(() => {
    if (isAuthenticated && user) { // Ensure user data is also present if needed for HomeScreen
      navigation.navigate('Home'); // Navigate to your HomeScreen
    }
  }, [isAuthenticated, user, navigation]); // Depend on isAuthenticated, user, and navigation
console.log(error)
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Loader loading={loading}/>
        <FitFlixlogo
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login to Your Account</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

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

        {/* <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpLink}> Sign up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}