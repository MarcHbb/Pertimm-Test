import { axiosInstance } from '../config/apiConfig';

export const registerUser = async (email: string, password: string, onSuccess: (token: string, email: string) => void, onError: (error: string) => void) => {
    try {
        const response = await axiosInstance.post('/api/v1.1/auth/register/', {
            email,
            password1: password,
            password2: password,
        });

        if (response.status !== 201) {
            onError(
                response.data.detail || 'Registration failed. Please try again.'
            );
        } else {
            onSuccess(response.data.token, email);
        }
    } catch (error) {
        onError('An unexpected error occurred. Please try again later.');
    }
};

export const loginUser = async (email: string, password: string, onSuccess: (token: string, email: string) => void, onError: (error: string) => void) => {
    try {
        const response = await axiosInstance.post('/api/v1.1/auth/login/', {
            email,
            password,
        });

        if (response.status !== 200) {
            onError(
                response.data.detail || 'Login failed. Please check your credentials.'
            );
        } else {
            onSuccess(response.data.token, email);
        }
    } catch (error) {
        onError('An unexpected error occurred. Please try again later.');
    }
}

export const pollConfirmedStatus = async (
    url: string,
    onComplete: (url: string) => void,
    onError: (error: string) => void,
    interval = 1000,
    maxAttempts = 50
) => {

    let attempts = 0;

    const checkStatus = async (): Promise<unknown> => {
        try {
            const response = await axiosInstance.get(url);
            const { data } = response;

            if (data.status === 'COMPLETED' && data.confirmation_url) {
                onComplete(data.confirmation_url);
                return;
            }

            if (attempts++ >= maxAttempts) {
                onError('Max attempts reached');
            }
        } catch (error) {
            onError('An error occurred while checking the status.');
        }

        return new Promise((resolve) => {
            setTimeout(() => resolve(checkStatus()), interval);
        });
    };
    return checkStatus();
};

export const confirmApplication = async (confirmationUrl: string, onSuccess: () => void, onError: (error: string) => void) => {
    try {
        const response = await axiosInstance.patch(confirmationUrl, {
            confirmed: true,
        });

        if (response.status === 200) {
            onSuccess();
        } else {
            onError('Failed to confirm application. Please try again.');
        }
    } catch (error) {
        onError(
            'An unexpected error occurred while confirming the application.'
        );
    }
};