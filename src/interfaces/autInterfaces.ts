export interface AuthState {
    auth: {
        token: string | null;
        user: any | null; 
        isAuthenticated: boolean;
        loading: boolean;
        error: string | null;
      };
  }

export interface UserData {
    name: string;
    phone_number: string;
    email: string;
    password: string;
}
  
  