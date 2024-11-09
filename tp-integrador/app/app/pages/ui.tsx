'use client'

import {useState} from "react";
import {Edit, Link as IconLink, QrCode, Search, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Page} from "@/types/common";
import {usePagesQuery, useDeletePageMutation} from "@/queries/pages";
import {useRouter} from "next/navigation";
import ConfirmationModal from "@/components/modals/confirmation";

export default function UserPagesList({pages: pagesProp}: { pages?: Page[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const router = useRouter();
  const {data: pages, refetch: refetchPages} = usePagesQuery(pagesProp);
  const {isPending: deleteIsPending, ...deleteMutation} = useDeletePageMutation();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleGetQR = (id: string) => {
    console.log('Generating QR code for page ID:', id);
  };

  const handleEdit = (id: string) => {
    router.push('/app/pages/' + id + '/edit');
  };

  const goToPage = (shortId: string) => {
    router.push('/p/' + shortId);
  };

  const handleDelete = (id: string) => {
    setPageToDelete(id);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      deleteMutation.mutate(pageToDelete, {
        onSuccess: async () => {
          setPageToDelete(null);
          await refetchPages();
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Pages</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          <Input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Page Title</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages && pages.map((page) => (
            <TableRow key={page._id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell className="text-right">
                {page.shortId && <Button
                    className="mr-2"
                    variant="ghost"
                    size="icon"
                    onClick={() => goToPage(page.shortId || '')}
                >
                    <IconLink className="h-4 w-4" href={'/p/' + page.shortId}/>
                    <span className="sr-only">Get Link</span>
                </Button>}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleGetQR(page._id)}
                  className="mr-2"
                >
                  <QrCode className="h-4 w-4"/>
                  <span className="sr-only">Get QR Code</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(page._id)}
                  className="mr-2"
                >
                  <Edit className="h-4 w-4"/>
                  <span className="sr-only">Edit</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(page._id)}
                >
                  <Trash2 className="h-4 w-4"/>
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmationModal
        loading={deleteIsPending}
        isOpen={!!pageToDelete}
        onClose={() => setPageToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Page"
        description="Are you sure you want to delete this page? This action cannot be undone."
      />
    </div>
  );
}