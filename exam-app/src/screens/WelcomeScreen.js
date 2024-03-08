import { View, Text, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import i18n from "../constants/languages/i182-config";
// import * as Localization from 'expo-localization';

// constants [color]
import COLORS from "../constants/colors";

// i18n.locale = "ar";

// components
import Button from '../components/Button';

const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../assets/hero1.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../../assets/hero3.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../../assets/hero3.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../../assets/hero2.jpg")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>
                        { i18n.t("letIsGet") }
                    </Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>
                        { i18n.t("started") }
                    </Text>

                    <Button
                        title={ i18n.t("teacher") }
                        onPress={() => navigation.navigate("login", { roleType: "teacher"})}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />
                    <Button
                        title={ i18n.t("student") }
                        onPress={() => navigation.navigate("login", { roleType: "student"})}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome