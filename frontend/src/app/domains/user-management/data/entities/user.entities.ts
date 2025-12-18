export interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
}
export interface RegisterRequest {
    age: number;
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: string;
        name: string;
        email: string;
        age: number;
    };
}