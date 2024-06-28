import React, { useState, useEffect,createContext,useContext } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text } from 'react-native';

// import { useAuth } from '../context/AuthContext';

export default function AppIndex() {
    const isAuthenticated = useLocalSearchParams();

    // const { isAuthenticated } = useAuth();
    const router = useRouter();
    console.log(isAuthenticated);

    // useEffect(() => {
    //     console.log("repeat");
    //     if (!isAuthenticated) {
    //         router.replace('/auth/auth');
    //     }
    //     else{
    //         router.replace("/home");
    //     }
    // }, [isAuthenticated]);


    // if (!isAuthenticated) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <Text>Loading...</Text>
    //         </View>
    //     );
    // }

    return (
        <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }}   />
            <Stack.Screen name="create" options={{ headerShown: false }}  />
        </Stack>
    );
}
