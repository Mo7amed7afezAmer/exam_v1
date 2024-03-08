import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import i18n from '../constants/languages/i182-config';

// icons 
import { Ionicons } from "@expo/vector-icons";

// constants
import COLORS from '../constants/colors';
import globalStyles from '../constants/global';

// components
import Button from '../components/Button';

const Signup = ({ navigation, route }) => {
    // params
    const { roleType } = route.params;

    const [ isPasswordShown, setIsPasswordShown ] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);
    // data
    const [ userName, setUserName ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ phaseOrMaterial, setPhaseOrMaterial ] = useState(null);
    // context hooks
    const { isLoading, register } = useContext(AuthContext);

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <Spinner visible={ isLoading } />

                <View style={{ marginBottom: 12 }}>
                    <Text style={ globalStyles.labelTitle }>
                      { i18n.t("userName") }
                    </Text>
                    <View style={ globalStyles.inputBox }>
                        <TextInput
                            placeholder={ i18n.t("userName") }
                            placeholderTextColor={COLORS.black}
                            keyboardType='email-address'
                            onChangeText={(text) => setUserName(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={ globalStyles.labelTitle }>
                      { i18n.t("password") }
                    </Text>
                    <View style={ globalStyles.inputBox }>
                        <TextInput
                            placeholder={ i18n.t("password") }
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setPassword(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                                ) : (
                                    <Ionicons name="eye" size={24} color={COLORS.black} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Text style={ globalStyles.labelTitle }>
                      { roleType === "teacher" ? i18n.t("material") : i18n.t("phase") }
                    </Text>
                    <View style={ globalStyles.inputBox }>
                        <TextInput
                            placeholder={ roleType === "teacher" ? i18n.t("material") : i18n.t("phase") }
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={isPasswordShown}
                            onChangeText={text => setPhaseOrMaterial(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />

                    <Text>{ i18n.t("rememberMe") }</Text>
                </View>

                <Button
                    title={ i18n.t("register") }
                    filled
                    onPress={() => {
                      register(userName, password, phaseOrMaterial, roleType);
                    }}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />
                
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("login", { roleType: roleType})}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>{ i18n.t("login") }</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Signup