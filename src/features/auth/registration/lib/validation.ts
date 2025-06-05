import * as yup from "yup";

export const regSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email('Enter a valid email address').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 6 characters long').required('Password required'),
});