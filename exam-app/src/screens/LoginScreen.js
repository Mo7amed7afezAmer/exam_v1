import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState, useContext } from 'react';
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

const Login = ({ route, navigation }) => {
    // params
    // const { roleType } = route.params;
    const [ roleType, setRoleType] = useState("teacher")
    console.log(roleType);

    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    // data
    const [userName, setUserName ] = useState(null);
    const [password, setPassword] = useState(null);
    // context hooks
    const { isLoading, login } = useContext(AuthContext);

    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <Spinner visible={ isLoading } />
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        { i18n.t("hiWelcomeBack") }
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}> { i18n.t("helloAgain") } </Text>
                </View>

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
                    title={ i18n.t("login") }
                    filled
                    onPress={() => {
                      login(userName, password, roleType);
                    }}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                    <Text style={{ fontSize: 14 }}>{ i18n.t("orLoginWith") }</Text>
                    <View
                        style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: COLORS.grey,
                            marginHorizontal: 10
                        }}
                    />
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    // display: "none"
                }}>
                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/facebook.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>{ i18n.t("facebook") }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => console.log("Pressed")}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            height: 52,
                            borderWidth: 1,
                            borderColor: COLORS.grey,
                            marginRight: 4,
                            borderRadius: 10
                        }}
                    >
                        <Image
                            source={require("../../assets/google.png")}
                            style={{
                                height: 36,
                                width: 36,
                                marginRight: 8
                            }}
                            resizeMode='contain'
                        />

                        <Text>{ i18n.t("google") }</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("signup", { roleType: roleType})}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>{ i18n.t("register") }</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login