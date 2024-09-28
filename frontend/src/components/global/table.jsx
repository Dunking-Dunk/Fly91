import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Download, Filter, X } from "lucide-react"
import { format } from "date-fns"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define the data type


// Mock data
const mockData= [
  { srn: 'SRN-CAB-000122', service: 'Cab', requestRaised: '24-Sep-2024', fulfilled: '-', status: 'Submitted' },
  { srn: 'SRN-CAB-000123', service: 'Cab', requestRaised: '24-Sep-2024', fulfilled: '-', status: 'Confirmed' },
  { srn: 'SRN-CAB-000124', service: 'Cab', requestRaised: '24-Sep-2024', fulfilled: '25-Sep-2024', status: 'Completed' },
  { srn: 'SRN-CAB-000125', service: 'Cab', requestRaised: '24-Sep-2024', fulfilled: '25-Sep-2024', status: 'Completed' },
]

// Define the columns
const columns = [
  {
    accessorKey: "srn",
    header: "SRN",
  },
  {
    accessorKey: "service",
    header: "Service",
  },
  {
    accessorKey: "requestRaised",
    header: "Request raised",
  },
  {
    accessorKey: "fulfilled",
    header: "Fulfilled",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") 
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
          status === 'Confirmed' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      )
    },
  },
]

export default function Component() {
  const [data, setData] = React.useState(mockData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [activeFilter, setActiveFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const clearFilter = (filter) => {
    table.getColumn(filter)?.setFilterValue("")
    setActiveFilter('')
  }

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Button className="bg-green-500 hover:bg-green-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <Select onValueChange={(value) => table.getColumn('service')?.setFilterValue(value)}>
                  <SelectTrigger className="bg-yellow-100">
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cab">Cab</SelectItem>
                  </SelectContent>
                </Select>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-gray-200">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        From
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        onSelect={(date) => table.getColumn('requestRaised')?.setFilterValue(date ? format(date, 'dd-MMM-yyyy') : '')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-gray-200">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        To
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        onSelect={(date) => table.getColumn('fulfilled')?.setFilterValue(date ? format(date, 'dd-MMM-yyyy') : '')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Select onValueChange={(value) => table.getColumn('status')?.setFilterValue(value)}>
                  <SelectTrigger className="bg-gray-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        <Button
          onClick={() => setActiveFilter('service')}
          className={`px-4 py-2 rounded ${activeFilter === 'service' ? 'bg-yellow-100' : 'bg-gray-100'}`}
        >
          Service
          {table.getColumn('service')?.getFilterValue() && (
            <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs flex items-center">
              {table.getColumn('service')?.getFilterValue() }
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); clearFilter('service'); }} />
            </span>
          )}
        </Button>
        <Button
          onClick={() => setActiveFilter('dateRange')}
          className={`px-4 py-2 rounded ${activeFilter === 'dateRange' ? 'bg-yellow-100' : 'bg-gray-100'}`}
        >
          Date Range
          {(table.getColumn('requestRaised')?.getFilterValue() || table.getColumn('fulfilled')?.getFilterValue()) && (
            <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs flex items-center">
              {table.getColumn('requestRaised')?.getFilterValue()} - {table.getColumn('fulfilled')?.getFilterValue()}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); clearFilter('requestRaised'); clearFilter('fulfilled'); }} />
            </span>
          )}
        </Button>
        <Button
          onClick={() => setActiveFilter('status')}
          className={`px-4 py-2 rounded ${activeFilter === 'status' ? 'bg-yellow-100' : 'bg-gray-100'}`}
        >
          Status
          {table.getColumn('status')?.getFilterValue() && (
            <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs flex items-center">
              {table.getColumn('status')?.getFilterValue()}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); clearFilter('status'); }} />
            </span>
          )}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-end">
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Raise New Request</Button>
      </div>
    </div>
  )
}