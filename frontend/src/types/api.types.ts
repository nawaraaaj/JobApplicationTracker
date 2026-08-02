export interface ApiError {
    code: string;
    message: string;
}

export type Result<T> =
    | { isSuccess: true; value: T; error?: never }
    | { isSuccess: false; value?: never; error: { code: string; message: string; type: string } };