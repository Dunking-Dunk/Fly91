import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Download, Filter, X, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import {
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


export default function Component({data, columns}) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [activeFilter, setActiveFilter] = useState('')
  const [pageSize, setPageSize] = React.useState(5)

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
      <div className="flex justify-end items-center mb-4">
        <div className="space-x-2">
          <Button className="bg-green-500 hover:bg-green-600 text-white"><Download className="mr-2 h-4 w-4" /> Download</Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Filter className="mr-2 h-4 w-4" /> Filter <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in progress">In Progress</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex space-x-2 mb-4 justify-end">
      <Button
  onClick={() => setActiveFilter('service')}
  className={`px-4 py-2 rounded ${activeFilter === 'service' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-900'}`}
>
  Service
  {table.getColumn('service')?.getFilterValue() && (
    <span className="ml-2 bg-gray-200 px-2 py-1 rounded-full text-xs flex items-center">
      {table.getColumn('service')?.getFilterValue()}
      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={(e) => { e.stopPropagation(); clearFilter('service'); }} />
    </span>
  )}
</Button>

<Button
  onClick={() => setActiveFilter('dateRange')}
  className={`px-4 py-2 rounded ${activeFilter === 'dateRange' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-900'}`}
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
  className={`px-4 py-2 rounded ${activeFilter === 'status' ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-900'}`}
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
                    <TableCell key={cell.id} className='py-2'>
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        
        </div>
      </div>
    </div>
  )
}