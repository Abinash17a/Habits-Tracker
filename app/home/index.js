import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, Image, Alert, Modal } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AntDesign, Ionicons, Feather, EvilIcons, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from "@react-navigation/native";
import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

const index = ({route}) => {
    const currentDay = new Date()
        .toLocaleDateString("en-US", { weekday: "short" })
        .slice(0, 3);

    const router = useRouter();
    const [option, setOption] = useState("Today");
    const [isModalVisible, setModalVisible] = useState(false);
    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState();
    // const { isAuthenticated, setIsAuthenticated } = route.params;

    // const isAuthenticated = useLocalSearchParams()

    useFocusEffect(
        useCallback(() => {
            fetchHabits();
        }, [])
    );

    const handleLongPress = (habitId) => {
        const selectedHabit = habits?.find((habit) => habit.id == habitId);
        setSelectedHabit(selectedHabit);
        setModalVisible(true);
    };
    const filteredHabits = habits?.filter((habit) => {
        const completedHabits=JSON.parse(habit.completed);    
        console.log("completed habits in filtered",completedHabits);
        return !completedHabits || !completedHabits[currentDay];
    });

    const handleCompletion = async () => {
        try {
            const habitId = selectedHabit?.id;
            const completedDays = JSON.parse(selectedHabit?.completed)
            const updatedCompletion = {
                ...completedDays,
                [currentDay]: true,
            };

            await axios.put(`http://10.0.2.2:3000/habits/${habitId}/completed`, {
                completed: updatedCompletion,
            });

            await fetchHabits();
            setModalVisible(false);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const fetchHabits = async () => {
        try {
            const response = await axios.get("http://10.0.2.2:3000/habits");
            setHabits(response.data);
            console.log("fetched habits",response.data);
            console.log("response length",response.data.length);
        } catch (error) {
            console.log("error fetching Habits", error);
        }
    };

    const deleteHabit = async () => {
        try {
            const habitId = selectedHabit.id;

            const response = await axios.delete(
                `http://10.0.2.2:3000/habits/${habitId}`
            );

            if (response.status == 200) {
                await fetchHabits();
                await filteredHabits();
                setHabits(response.data);
                setModalVisible(false);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    const getCompletedDays = (completedObj) => {
        if (completedObj && typeof completedObj === "object") {
            return Object.keys(completedObj).filter((day) => completedObj[day]);
        }
        return [];
    };

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <MaterialCommunityIcons name="prescription" size={30} color="black" />
                    <AntDesign onPress={() => router.push("/home/create")} name="plus" size={30} color="black" />
                </View>

                <Text style={{ marginTop: 5, fontSize: 23, fontWeight: "500" }}>Habits Tracker</Text>

                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 8 }}>
                    <Pressable
                        onPress={() => setOption("Today")}
                        style={{
                            backgroundColor: option == "Today" ? "#E0FFFF" : "transparent",
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderRadius: 25,
                        }}>
                        <Text style={styles.text}>Today</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setOption("Weekly")}
                        style={{
                            backgroundColor: option == "Weekly" ? "#E0FFFF" : "transparent",
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderRadius: 25,
                        }}>
                        <Text style={styles.text}>Weekly</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setOption("Overall")}
                        style={{
                            backgroundColor: option == "Overall" ? "#E0FFFF" : "transparent",
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderRadius: 25,
                        }}>
                        <Text style={styles.text}>Overall</Text>
                    </Pressable>
                </View>

                {option == "Today" &&
                    (filteredHabits?.length > 0 ? (
                        <View>
                            {filteredHabits?.map((item, index) => (
                                <Pressable
                                    key={index}
                                    onLongPress={() => handleLongPress(item.id)}
                                    style={{
                                        marginVertical: 10,
                                        backgroundColor: item?.color,
                                        padding: 20,
                                        borderRadius: 10,
                                        elevation: 3,
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "500",
                                            color: "white",
                                        }}
                                    >
                                        {item?.title}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    ) : (
                        <View
                            style={{
                                marginTop: 150,
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "auto",
                            }}
                        >
                            <Image
                                style={{ width: 60, height: 60, resizeMode: "cover" }}
                                source={{
                                    uri: "https://cdn-icons-png.flaticon.com/128/10609/10609386.png",
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    marginTop: 10,
                                }}
                            >
                                No habits for today
                            </Text>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    marginTop: 10,
                                }}
                            >
                                No habits for today. Create one?
                            </Text>
                            <Pressable
                                onPress={() => router.push("/home/create")}
                                style={{
                                    backgroundColor: "#0071c5",
                                    marginTop: 20,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    borderRadius: 25,
                                }}
                            >
                                <Text style={{ color: "white" }}>Create</Text>
                            </Pressable>
                        </View>
                    ))}

                {option == "Weekly" && (
                    <View>
                        {habits?.map((habit, index) => (
                            <Pressable key={index}
                                style={{
                                    marginVertical: 10,
                                    backgroundColor: habit.color,
                                    padding: 15,
                                    borderRadius: 10,
                                    elevation: 3,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ fontSize: 15, fontWeight: "500", color: "white" }}
                                    >
                                        {habit.title}
                                    </Text>
                                    <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-evenly",
                                        marginVertical: 10,
                                    }}
                                >
                                    {days?.map((day, item) => {
                                        const completedHabits=JSON.parse(habit.completed); 
                                        const isCompleted = completedHabits && completedHabits[day];

                                        return (
                                            <Pressable key={item}>
                                                <Text
                                                    style={{
                                                        color: day === currentDay ? "red" : "white",
                                                    }}
                                                >
                                                    {day}
                                                </Text>
                                                {isCompleted ? (
                                                 <FontAwesome
                                                 name="circle"
                                                 size={24}
                                                 color="white"
                                                 style={{ marginTop: 12 }}
                                               />
                                                ) : (
                                                    <Feather
                                                        name="circle"
                                                        size={24}
                                                        color="white"
                                                        style={{ marginTop: 12 }}
                                                    />
                                                )}
                                            </Pressable>
                                        );
                                    })}
                                </View>
                            </Pressable>
                        ))}
                    </View>
                )}
                {option === "Overall" && (
                    <View>
                        {habits?.map((habit, index) => (
                            <View key={index}>
                                <Pressable
                                    style={{
                                        marginVertical: 10,
                                        backgroundColor: habit.color,
                                        padding: 15,
                                        borderRadius: 10,
                                        elevation: 3,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                fontWeight: "500",
                                                color: "white",
                                            }}
                                        >
                                            {habit.title}
                                        </Text>
                                        <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                                    </View>
                                </Pressable>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text>Completed On</Text>
                                    <Text>{getCompletedDays(JSON.parse(habit.completed)).join(", ")}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(!isModalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Choose Option</Text>
                        <Pressable
                            onPress={handleCompletion}
                            style={styles.modalOption}
                        >
                            <Ionicons name="checkmark-circle-outline" size={24} color="black" />
                            <Text>Completed</Text>
                        </Pressable>
                        <Pressable style={styles.modalOption}>
                            <Feather name="skip-forward" size={24} color="black" />
                            <Text>Skip</Text>
                        </Pressable>
                        <Pressable style={styles.modalOption}>
                            <Feather name="edit-2" size={24} color="black" />
                            <Text>Edit</Text>
                        </Pressable>
                        <Pressable style={styles.modalOption}>
                            <EvilIcons name="archive" size={24} color="black" />
                            <Text>Archive</Text>
                        </Pressable>
                        <Pressable
                            onPress={deleteHabit}
                            style={styles.modalOption}
                        >
                            <AntDesign name="delete" size={24} color="black" />
                            <Text>Delete</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setModalVisible(!isModalVisible)}
                            style={[styles.modalOption, { marginTop: 20 }]}
                        >
                            <Text style={{ color: "red" }}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        textAlign: "center",
        color: "gray",
        fontSize: 14
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 10,
        paddingVertical: 10,
        width: '100%',
        justifyContent: 'flex-start',
    }
});
