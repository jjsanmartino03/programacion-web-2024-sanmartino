import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {Page} from "@/types/common";
import {toast} from "@/hooks/use-toast";

export const usePagesQuery = (keyword: string, defaultPages?: Page[]) => useQuery<Page[]>({
  queryKey: ['pages', keyword],
  initialData: defaultPages,
  queryFn: async () => {
    const response = await axios.get(`/api/pages`, {
      params: {
        keyword
      }
    });
    return response.data;
  }
});

const createPage = async (pageData: Omit<Page, 'slug' | 'shortId' | 'userId' | '_id'>): Promise<unknown> => {
  const response = await axios.post('/api/pages', pageData);
  return response.data;
};

export const useCreatePageMutation = () => useMutation({
  mutationFn: createPage,
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Your page has been created.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Failed to create page. Please try again.",
      variant: "destructive",
    });
  },
});

const updatePage = async (pageData: Omit<Page, 'slug' | 'shortId' | 'userId'>): Promise<unknown> => {
  const response = await axios.put(`/api/pages/${pageData._id}`, pageData);
  return response.data;
};

export const useUpdatePageMutation = () => useMutation({
  mutationFn: updatePage,
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Your page has been updated.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Failed to update page. Please try again.",
      variant: "destructive",
    });
  },
});

const deletePage = async (id: string): Promise<unknown> => {
  const response = await axios.delete(`/api/pages/${id}`);
  return response.data;
};

export const useDeletePageMutation = () => useMutation({
  mutationFn: deletePage,
  onSuccess: () => {
    toast({
      title: "Success",
      description: "Your page has been deleted.",
    });
  },
  onError: () => {
    toast({
      title: "Error",
      description: "Failed to delete page. Please try again.",
      variant: "destructive",
    });
  },
});