

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

export interface UserProfile {
	name: string;
    email: string;
    direction: string;
};

export interface UserResponse {
    id?:number;
    name: string;
    email: string;
    isActive?: boolean;
    password: string;
    directionId: number;
};