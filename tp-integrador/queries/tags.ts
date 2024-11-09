import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "@/types/common";
import { toast } from "@/hooks/use-toast";

export const useTagsQuery = (tags?: Tag[]) => useQuery<Tag[]>({
  queryKey: ['tags'],
  queryFn: async () => {
    const response = await axios.get('/api/tags');
    return response.data;
  },
  initialData: tags
});

export const useTagMutation = () => useMutation({
  mutationFn: async (tagData: Omit<Tag, '_id'>) => {
    const response = await axios.post<{insertedId:string}>('/api/tags', tagData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  },
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Your tag has been created.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Failed to create tag. Please try again.",
      variant: "destructive",
    });
  },
});