import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import FormButton from '../components/LoginButton';
import { $gray } from '../constants/Colors';
import Input from '../components/Input';
import AuthLayout from '../components/AuthLayout';

export default function LoginScreen({ navigation }) {
  return (
    <AuthLayout>
      <Text style={styles.title}>Sign in to continue</Text>
      <View style={styles.info}>

        <Input label="Email" keyboardType="email-address" placeholder="Your email">
          <MaterialIcon name="email-outline" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input label="Password" placeholder="Your password" secureTextEntry>
          <SimpleLineIcons name="lock" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <View style={styles.signUpBlock}>
          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Registration')}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Text style={[styles.signUpLink, styles.signUpText]}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FormButton onClick={() => {}}>SIGN IN</FormButton>
    </AuthLayout>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
  info: {
    marginBottom: 45,
  },
  signUpBlock: {
    alignItems: 'flex-end',
    marginTop: 7,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  inputIcon: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  signUpButton: {
    flexDirection: 'row',
  },
});