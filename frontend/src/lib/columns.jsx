import { Button } from "@/components/ui/button"

export const employeeDashboardColumn =  [
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
            status === 'Completed' ? 'bg-green-100 text-green-800' :
            status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
            status === 'Rejected' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-6">
            <Button variant="ghost" className="h-8 w-8 p-0">
              View
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0">
              Edit
            </Button>
            <Button variant="ghost" className="h-8 w-8 p-0">
              Cancel
            </Button>
          </div>
        )
      },
    },
  ]