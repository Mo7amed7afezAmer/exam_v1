import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import { BASE_URL } from '../../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  // hook 
  const [userInfo, setUserInfo] = useState({});
  const [roleType, setRoleType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, password, phMaterial, subLink) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/${subLink}/register`, {
        name: name,
        password: password,
        phaseMaterial: phMaterial
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('roleType', subLink);
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password, subLink) => {
    setIsLoading(true);

    axios({
        method: "post",
        url: `${BASE_URL}/${subLink}/login`,
        data: {
            name: email,
            password: password
        }
    })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('roleType', subLink);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    // setIsLoading(true);

    // axios
    //   .post(
    //     `${BASE_URL}/logout`,
    //     {},
    //     {
    //       headers: {Authorization: `Bearer ${userInfo.access_token}`},
    //     },
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     AsyncStorage.removeItem('userInfo');
    //     setUserInfo({});
    //     setIsLoading(false);
    //   })
    //   .catch(e => {
    //     console.log(`logout error ${e}`);
    //     setIsLoading(false);
    //   });
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let roleType = await AsyncStorage.getItem('roleType');
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setRoleType(roleType);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        roleType,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};