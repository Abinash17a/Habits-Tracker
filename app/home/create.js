import { TextInput, StyleSheet, Text, View, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

const CreateHabit = () => {
    const [selectedColor, setSelectedColor] = useState("");
    const [title, setTitle] = useState("");


    const colors = [
        "#FF5733", // Red
        "#FFD700", // Gold
        "#5D76A9",
        "#1877F2", // Purple
        "#32CD32", // Lime
        "#CCCCFF", // Light Red
        "#4169E1" // Royal Blue
    ];

    const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    async function addHabit() {
        try {
            const habitDetails = {
                title: title,
                color: selectedColor,
                repeatMode: "daily",
                reminder: true,
            };

            console.log(habitDetails);

            const response = await axios.post("http://10.0.2.2:3000/habits", habitDetails);

            if (response.status === 200) {
                setTitle("");
                Alert.alert("Habit added successfully", "Enjoy Practicing");
            }
        } catch (error) {
            console.log("error adding a habit", error);

            if (error.response) {
                console.log("Error response:", error.response.data);
            } else if (error.request) {
                console.log("Error request:", error.request);
            } else {
                console.log("Error message:", error.message);
            }

            Alert.alert("Error", "Failed to add habit. Please try again.");
        }
    }

    return (
        <View style={{ padding: 10 }}>
            <Ionicons name="chevron-back" size={24} color="black" />

            <Text style={{ fontSize: 20, marginTop: 10 }}>
                Create <Text style={{ fontSize: 20, fontWeight: "500" }}>Habit</Text>
            </Text>

            <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{
                    width: "95%",
                    marginTop: 15,
                    padding: 15,
                    borderRadius: 10,
                    backgroundColor: "#E1EBEE",
                }}
                placeholder="Title"
            />

            <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "500" }}>Color</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
                    {colors.map((item, index) => (
                        <TouchableOpacity onPress={() => setSelectedColor(item)} key={index} activeOpacity={0.8}>
                            {selectedColor === item ? (
                                <AntDesign name="plussquare" size={30} color={item} />
                            ) : (
                                <FontAwesome name="square" size={30} color={item} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <Text style={{ fontSize: 18, fontWeight: "500" }}>Repeat</Text>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 10 }}>
                <Pressable style={{ backgroundColor: "#AFDBF5", padding: 10, borderRadius: 6, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Daily</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: "#AFDBF5", padding: 10, borderRadius: 6, flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Weekly</Text>
                </Pressable>
            </View>

            <Text style={{ fontSize: 18, fontWeight: "500" }}>On These Days</Text>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
                {days.map((item, index) => (
                    <Pressable
                        key={index}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 5,
                            backgroundColor: "#E0E0E0",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text>{item}</Text>
                    </Pressable>
                ))}
            </View>

            <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 17, fontWeight: "500" }}>Reminder</Text>
                <Text style={{ fontSize: 17, fontWeight: "500", color: "#2774AE" }}>Yes</Text>
            </View>

            <Pressable
                onPress={addHabit}
                style={{
                    marginTop: 25,
                    backgroundColor: "#00428c",
                    padding: 10,
                    borderRadius: 8,
                }}
            >
                <Text style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>SAVE</Text>
            </Pressable>
        </View>
    );
}

export default CreateHabit;

const styles = StyleSheet.create({});
