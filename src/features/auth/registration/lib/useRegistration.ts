import { regSchema } from "@/features/auth/registration/lib/validation.ts";
import { type Auth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, type Firestore, serverTimestamp, setDoc } from "firebase/firestore";
import * as yup from "yup";
import { inject, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import type { UserRegistrationData } from "@/entities/user";
import type {ErrorRegistrationData} from "@/features/auth/registration/model/types.ts";



export function useRegistration() {
    const db = inject<Firestore>('firestoreDb')!;
    const auth = inject<Auth>('firebaseAuth')!;
    const router = useRouter();

    const errorMessage = ref<ErrorRegistrationData>({});
    const loading = ref(false);

    const registerUser = async (userData: UserRegistrationData, role: string) => {
        errorMessage.value = {};
        loading.value = true;

        try {
            await regSchema.validate(
                {
                    lastName: userData.lastName,
                    firstName: userData.firstName,
                    email: userData.email,
                    password: userData.password
                },
                { abortEarly: false });

            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const firebaseUser = userCredential.user;

            const userDoc = doc(db, 'users', firebaseUser.uid);
            await setDoc(userDoc, {
                email: firebaseUser.email,
                lastName: userData.lastName,
                firstName: userData.firstName,
                role: role,
                createdAt: serverTimestamp()
            });

            await router.push({ name: `${role}-home` });

        } catch (err: any) {
            if (err instanceof yup.ValidationError) {
                err.inner.forEach(error => {
                    switch (error.path) {
                        case 'firstName': errorMessage.value.firstNameError = error.message;
                            break;
                        case 'lastName': errorMessage.value.lastNameError = error.message;
                            break;
                        case 'email': errorMessage.value.emailError = error.message;
                            break;
                        case 'password': errorMessage.value.passwordError = error.message;
                            break;
                    }
                });
            } else {
                // Более общая ошибка Firebase или другая
                console.error('Registration Error:', err);
                errorMessage.value.formError = err.message || 'An unexpected error occurred during registration.';
                if (err.code === 'auth/email-already-in-use') {
                    errorMessage.value.emailError = 'This email is already in use.';
                } else {
                    errorMessage.value.formError = 'Invalid e-mail or password, or another registration error.';
                }
            }
        } finally {
            loading.value = false;
        }
    };

    return {
        errorMessage,
        loading,
        registerUser
    };
}