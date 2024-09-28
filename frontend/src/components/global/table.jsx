import { useState, useEffect } from "react";
import { ChevronDown, Download, ArrowUpDown, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addDays, format } from "date-fns";

export default function TableComponent({ initialRequests }) {
  const [requests, setRequests] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [dateRange, setDateRange] = useState([
    addDays(new Date(), -30),
    new Date(),
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialRequests && initialRequests.length > 0) {
      setRequests(initialRequests);
    }
  }, [initialRequests]);

  const handleFilter = (type) => {
    setFilterType(type);
    if (!initialRequests) return;

    let filteredRequests = [...initialRequests];
    if (type === "Completed") {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === "Completed"
      );
    } else if (type === "Pending") {
      filteredRequests = filteredRequests.filter(
        (request) => request.status !== "Completed"
      );
    }
    setRequests(filteredRequests);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedRequests = [...requests].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRequests(sortedRequests);
  };

  const handleDateRangeChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1] && initialRequests) {
      const filteredRequests = initialRequests.filter((request) => {
        const requestDate = new Date(request.requestRaised);
        return requestDate >= update[0] && requestDate <= update[1];
      });
      setRequests(filteredRequests);
    }
  };

  if (!initialRequests || initialRequests.length === 0) {
    return <div className="text-center py-10">No requests available.</div>;
  }

  return (
    <div className="container flex flex-col justify-center mt-[10vh] align-middle p-4 max-w-6xl ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-orange-400 hover:bg-orange-500 text-white border-none"
              >
                Filter
                <ChevronDown className="w-7 h-10 ml-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter By Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleFilter("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter("Completed")}>
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter("Pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleSort("requestRaised")}>
                Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("service")}>
                Service
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("status")}>
                Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DatePicker
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={handleDateRangeChange}
            className="bg-blue-500 hover:bg-blue-600 text-white border-none rounded px-4 py-2"
            customInput={
              <Button
                variant="outline"
                className="bg-blue-500 hover:bg-blue-600 text-white border-none"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {dateRange[0] && dateRange[1] ? (
                  <>
                    {format(dateRange[0], "LLL dd, y")} -{" "}
                    {format(dateRange[1], "LLL dd, y")}
                  </>
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            }
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                SRN
                <Button
                  variant="ghost"
                  onClick={() => handleSort("srn")}
                  className="ml-2 p-0"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Service
                <Button
                  variant="ghost"
                  onClick={() => handleSort("service")}
                  className="ml-2 p-0"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Request raised
                <Button
                  variant="ghost"
                  onClick={() => handleSort("requestRaised")}
                  className="ml-2 p-0"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Fulfilled
                <Button
                  variant="ghost"
                  onClick={() => handleSort("fulfilled")}
                  className="ml-2 p-0"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="px-12 py-10 font-semibold text-gray-600">
                Status
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="ml-2 p-0"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="px-8 py-10 font-medium text-blue-600">
                  {request.srn}
                </TableCell>
                <TableCell className="px-8 py-10">{request.service}</TableCell>
                <TableCell className="px-8 py-10">
                  {request.requestRaised}
                </TableCell>
                <TableCell className="px-8 py-10">
                  {request.fulfilled}
                </TableCell>
                <TableCell className="px-8 py-10">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : request.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={(e) => {
            console.log("clicked");
            navigate("/serviceform");
          }}
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-12 py-7"
        >
          Raise New Request
        </Button>
      </div>
    </div>
  );
}
