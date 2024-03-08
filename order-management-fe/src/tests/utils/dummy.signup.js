export const firstNameTestIdRegex = /firstName-input/i;
export const lastNameTestIdRegex = /lastName-input/i;
export const emailTestIdRegex = /email-input/i;
export const phoneNumberTestIdRegex = /phoneNumber-input/i;
export const passwordTestIdRegex = /password-input/i;
export const confirmPasswordTestIdRegex = /confirmPassword-input/i;
export const addressLine1TestIdRegex = /addressLine1-input/i;
export const cityTestIdRegex = /city-input/i;
export const stateTestIdRegex = /state-input/i;
export const zipCodeTestIdRegex = /zipCode-input/i;

export const requiredFields = {
    errors: {
        firstName: 'First Name is required',
        lastName: 'Last Name is required',
        email: 'Email is required',
        phoneNumber: 'Phone Number is required',
        password: 'Password is required',
        confirmPassword: 'Confirm Password is a required',
        addressLine1: 'Address Line 1 is required',
        city: 'City is required',
        state: 'State is required',
        zipCode: 'Zip Code is required',
    }
}

export const invalidValues = {
    values: {
        firstName: 'asdfghjklqwertyuiopzxcvbnmqwertyuiop',
        lastName: 'asdfghjklqwertyuiopzxcvbnmqwertyuiop',
        email: 'test@test',
        phoneNumber: '12345678901',
        password: '1234567890',
        confirmPassword: '0987654321',
    },
    errors: {
        firstName: 'firstName must be at most 30 characters',
        lastName: 'lastName must be at most 30 characters',
        email: 'Invalid email',
        phoneNumber: 'phoneNumber must be at most 10 characters',
        password: 'Password must contain at least 8 characters, one letter, one number, and one special character',
        confirmPassword: 'Passwords must match',
    }
}

export const loginNavigation = {
    loginText: 'Login',
    path: '/'
}

const formDetails = {
    firstName: 'test',
    lastName: 'test',
    email: 'test@test.com',
    phoneNumber: '1234567890',
    password: 'Test@1234',
    confirmPassword: 'Test@1234',
    addressLine1: 'address 1',
    city: 'test',
    state: 'test',
    zipCode: '123456'
};

export const failRegistration = {
    values: { ...formDetails },
    submitText: 'Submit',
    errorMessage: 'Registration failed',
    toastMessage: 'Failed to register owner: Registration failed'
}

export const successfulRegistration = {
    values: { ...formDetails },
    submitText: 'Submit',
    toastMessage: 'Owner registered successfully',
    path: '/'
}
