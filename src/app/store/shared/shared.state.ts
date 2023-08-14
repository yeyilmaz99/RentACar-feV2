

export interface SharedState {
    showLoading: boolean;
    loadingFrom:string;
    errorMessage:string;
}

export const initialState: SharedState = {
    loadingFrom:'',
    showLoading: false,
    errorMessage: ''
}