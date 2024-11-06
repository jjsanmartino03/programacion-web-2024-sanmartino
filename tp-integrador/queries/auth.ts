import {useMutation} from "@tanstack/react-query";
import axios from "axios";

export const useSignupMutation = () => useMutation({
  mutationFn: async (data: { email: string, password: string }) => {
    return await axios.post('/api/auth/register', data)
  }
})