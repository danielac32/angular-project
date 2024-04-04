

export interface User {
    email: string;
    password: string;
};


export interface UserUpdate {
    name: string;
    email: string;
    isActive?: boolean;
    password: string;
    password2?: string;
    directionId: number;
};