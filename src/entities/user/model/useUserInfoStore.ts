import {defineStore} from 'pinia';
import {inject, ref} from "vue";
import type {UserInfo} from "@/entities/user/model/user-info.ts";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/app/providers";
import {doc, type Firestore,getDoc} from "firebase/firestore";


export const useUserInfoStore = defineStore('userInfo', () => {

    const userInfo = ref<UserInfo>({
        id: '',
        username: '',
        email: '',
        roles: ['creator', 'user'],
    })
    const db = inject<Firestore>('firestoreDb')!;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {

                        const userDataFromDb = docSnap.data() ;
                        setUserInfo({
                            id: user.uid,
                            email: user.email! ,
                            username: userDataFromDb.firstName +" " + userDataFromDb.lastName,

                        });
                        console.log(userInfo.value)
                    } else {
                        console.log("Документ пользователя не найден в Firestore!");

                    }
                } catch (error) {
                    console.error("Ошибка при получении документа пользователя из Firestore:", error);
                }

        } else {
            console.log("Пользователь не в системе");

            setUserInfo({
                id: '',
                username: '',
                email: '',
                roles: [],
            });
        }
    });



    const setUserInfo = (updateUserInfoValue: Partial<UserInfo>) => {
        userInfo.value = {...userInfo.value, ...updateUserInfoValue}
    }

    const isAuthenticated = () => {

        return userInfo.value.id !== '';
    };


    return {userInfo, setUserInfo, isAuthenticated}
});