import axios from "axios";

export async function adminLoginAction(email: string, password: string) {
  try {
    const res = await axios.post("/api/signIn", {
  email,
  password,
}, {
  withCredentials: true
});

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Login failed",
    };
  }
}

export async function adminLogoutAction() {
  try {
    const res = await axios.post("/api/signOut");
    return res.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "Logout failed",
    };
  }
}
