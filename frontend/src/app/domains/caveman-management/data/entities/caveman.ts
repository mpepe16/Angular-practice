
export interface Caveman {
    id: string;
    name: string;
    age: number;
    location: string;
}
export interface UpdateCavemanDto {
    name?: string;
    age?: number;
    location?: string;
}

export interface CreateCavemanDto {
    name: string;
    age: number;
    location: string;
}