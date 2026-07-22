export interface ApiError {
    code: string;
    message: string;
}

export interface Result<T> {
    isSuccess: boolean;
    value: T | null;
    error: ApiError | null;
}