import * as React from "react"
import { ChevronDownIcon, DownloadIcon, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialRequests = [
  { srn: "SRN-CAB-202122", service: "Cab", requestRaised: "24-Sep-2024", fulfilled: "-", status: "Submitted" },
  { srn: "SRN-CAB-202123", service: "Cab", requestRaised: "25-Sep-2024", fulfilled: "-", status: "Confirmed" },
  { srn: "SRN-CAB-202124", service: "Cab", requestRaised: "26-Sep-2024", fulfilled: "27-Sep-2024", status: "Completed" },
  { srn: "SRN-CAB-202125", service: "Cab", requestRaised: "27-Sep-2024", fulfilled: "28-Sep-2024", status: "Completed" },
]

export default function TableComponent() {
  const [requests, setRequests] = React.useState(initialRequests)
  const [filterType, setFilterType] = React.useState(null)
  const [sortConfig, setSortConfig] = React.useState(null)

  const handleFilter = (type) => {
    setFilterType(type)
    let filteredRequests = [...initialRequests]
    if (type === 'Completed') {
      filteredRequests = filteredRequests.filter(request => request.status === 'Completed')
    } else if (type === 'Pending') {
      filteredRequests = filteredRequests.filter(request => request.status !== 'Completed')
    }
    setRequests(filteredRequests)
  }

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    const sortedRequests = [...requests].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setRequests(sortedRequests)
  }

  return (
    
    <div className="container  flex flex-col justify-center mt-[10vh] align-middle   p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-green-500 hover:bg-green-600 text-white  border-none">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-orange-400 hover:bg-orange-500 text-white border-none">
                Filter
                <ChevronDownIcon className="w-7 h-10 ml-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter By Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter('Completed')}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter('Pending')}>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                SRN
                <Button variant="ghost" onClick={() => handleSort('srn')} className="ml-2 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Service
                <Button variant="ghost" onClick={() => handleSort('service')} className="ml-2 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Request raised
                <Button variant="ghost" onClick={() => handleSort('requestRaised')} className="ml-2 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Fulfilled
                <Button variant="ghost" onClick={() => handleSort('fulfilled')} className="ml-2 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Status
                <Button variant="ghost" onClick={() => handleSort('status')} className="ml-2 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <TableCell className="px-8 py-10 font-medium text-blue-600">{request.srn}</TableCell>
                <TableCell className="px-8 py-10">{request.service}</TableCell>
                <TableCell className="px-8 py-10">{request.requestRaised}</TableCell>
                <TableCell className="px-8 py-10">{request.fulfilled}</TableCell>
                <TableCell className="px-8 py-10">
                  <span className="px-2 py-1 rounded-full text-xs">
                    {request.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-12 py-7">
          Raise New Request
        </Button>
      </div>
    </div>
  )
}