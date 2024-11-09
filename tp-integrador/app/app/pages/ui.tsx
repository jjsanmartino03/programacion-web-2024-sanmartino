'use client'

import QRCodeModal from "@/components/qr/modal";
import {useCallback, useState} from "react";
import {Edit, Link as IconLink, QrCode, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Page, Tag} from "@/types/common";
import {usePagesQuery, useDeletePageMutation} from "@/queries/pages";
import {useRouter} from "next/navigation";
import ConfirmationModal from "@/components/modals/confirmation";
import {useTagsQuery} from "@/queries/tags";


export default function UserPagesList({pages: pagesProp, tags: tagsProp}: { pages?: Page[], tags?: Tag[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const [qrPageUrl, setQrPageUrl] = useState<{
    url: string, filename: string
  } | null>(null);
  const [searchParam, setSearchParam] = useState<string>('');
  const {data: tags} = useTagsQuery(tagsProp);
  const router = useRouter();
  const {data: pages, refetch: refetchPages} = usePagesQuery(searchParam, pagesProp);
  const {isPending: deleteIsPending, ...deleteMutation} = useDeletePageMutation();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onSearch = () => {
    setSearchParam(searchQuery)
  }

  const handleGetQR = (shortId: string, slug: string) => {
    setQrPageUrl({
      url: `${window.location.origin}/p/${shortId}`,
      filename: slug
    })
  };

  const getNameForTagId = useCallback((tagId: string) => {
    if (tags) {
      const tag = tags.find(t => t._id === tagId);
      return tag?.name;
    }
  }, [tags])

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
      <div className="mb-6 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search pages..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className=" "
        />
        <Button onClick={onSearch}
                variant={'outline'}>
          Buscar
        </Button>
        <Button
          className=""
          onClick={() => router.push('/app/pages/new')}
        >
          Create Page
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[40%] w-[50%]">Page Title</TableHead>
            <TableHead className="hidden md:block w-[30%]">Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages && tags && pages.map((page) => (
            <TableRow key={page._id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell className={'hidden md:table-cell h-full align-middle'}>
                <div className={'flex flex-wrap gap-1 items-center'}>{page.tags && page.tags.map(t => {
                  return <span className={'text-sm bg-green-200 rounded py-1 px-2'} key={t}>{getNameForTagId(t)}</span>
                })}</div>
              </TableCell>
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
                  onClick={() => handleGetQR(page.shortId || '', page.slug || '')}
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
      <QRCodeModal
        filename={qrPageUrl?.filename}
        url={qrPageUrl?.url || ''}
        isOpen={!!qrPageUrl}
        onClose={() => setQrPageUrl(null)}
      />
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