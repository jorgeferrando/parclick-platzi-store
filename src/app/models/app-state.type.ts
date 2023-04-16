export interface AppState {
  loading?: boolean;
  error?: string | null;
  data?: any
}

export const setLoading = (value: boolean): AppState => {
  return {
    loading: value,
    error: null,
    data: []
  }
}

export const setError = (value: string): AppState => {
  return {
    loading: false,
    error: value,
    data: []
  }
}

export const setData = (value: any): AppState => {
  return {
    loading: false,
    error: null,
    data: value
  }
}
