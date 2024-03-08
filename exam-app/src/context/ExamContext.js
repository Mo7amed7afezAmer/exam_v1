import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useState} from 'react';
import { BASE_URL } from '../../config';

// create context
export const ExamContext = createContext();

export const ExamProvider = ({children}) => {
    // hook state
    const [examInfo, setExamInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const createExam = async (name) => { // , phase, duration, numb
        setIsLoading(false);

        // store data in AsyncStorage
        AsyncStorage.setItem('examName', name);
        // let x = await AsyncStorage.getItem('examName');
        console.log(x);

        // axios({
        //     method: "post",
        //     url: `${BASE_URL}/auth`,
        //     data: {
        //         name: email,
        //         password: password
        //     }
        // })
        // .then(res => {
        //     let userInfo = res.data;
        //     console.log(userInfo);
        //     setUserInfo(userInfo);
        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        //     setIsLoading(false);
        // })
        //   .catch(e => {
        //     console.log(`login error ${e}`);
        //     setIsLoading(false);
        // });
    };

    // // start Exam 
    // const startExam = async () =>


  return (
    <ExamContext.Provider
      value={{
        isLoading,
        examInfo,
        createExam
      }}>
      {children}
    </ExamContext.Provider>
  );
};