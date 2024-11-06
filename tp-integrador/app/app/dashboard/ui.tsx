'use client'

import {useState} from "react";
import {Edit, Link as IconLink, QrCode, Search, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Page} from "@/types/common";
import {usePagesQuery} from "@/queries/pages";
import Link from "next/link";


export default function UserPagesList({pages: pagesProp}: { pages?: Page[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const {data: pages} = usePagesQuery(pagesProp);

  const filteredPages = pages ? pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleGetLink = (url: string) => {
    navigator.clipboard.writeText(url)
    // You might want to show a toast notification here
    console.log('Link copied to clipboard:', url)
  }

  const handleGetQR = (id: number) => {
    // This would typically generate and download a QR code
    console.log('Generating QR code for page ID:', id)
  }

  const handleEdit = (id: number) => {
    // This would navigate to the edit page
    console.log('Editing page ID:', id)
  }

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
          {paginatedPages.map((page) => (
            <TableRow key={page._id}>
              <TableCell className="font-medium">{page.title}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={'/p/' + page.shortId}
                  className="mr-2"
                >
                  <IconLink className="h-4 w-4" href={'/p/' + page.shortId}/>
                  <span className="sr-only">Get Link</span>
                </Link>
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
                  onClick={() => alert('eliminando')}
                >
                  <Trash2 className="h-4 w-4"/>
                  <span className="sr-only">Delete</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-l-md"
            >
              Previous
            </Button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? "default" : "outline"}
                className="rounded-none"
              >
                {page}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-r-md"
            >
              Next
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}