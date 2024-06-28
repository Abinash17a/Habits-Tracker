import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
// import { AuthContext } from '../context/AuthContext';

export default function AuthScreen({route}) {
//  console.log("Auth.js page AuthContext Value",AuthContext);
    // const { useAuth } = useContext(AuthContext);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    // const { isAuthenticated } = useContext(AuthContext);
    // console.log("IS AUthenticated",isAuthenticated);
    // const { setIsAuthenticated } = useAuth();
    // console.log("Auth.js page AuthContext Value",AuthContext);
    // console.log("Auth.js page useAuth Value",useAuth);

    // setIsAuthenticated(false)

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         router.replace('/home');
    //     } 
    // }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/auth/login', {
                username,
                password
            });

            if (response.data.success) {
                setIsAuthenticated(true);
                // isAuthenticated = true;
                console.log("isAunteticated in auth.js",isAuthenticated);
                // router.push({pathname: "/home", params: isAuthenticated});
                router.push("/home");
            } else {
                alert('Authentication failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Auth Screen</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, width: '80%' }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '80%' }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}
