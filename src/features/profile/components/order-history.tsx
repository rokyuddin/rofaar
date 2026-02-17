export function OrderHistory() {
  const orders = [
    {
      id: "#OU-1082",
      date: "Feb 12, 2023",
      status: "Delivered",
      total: "$124.50",
      items: 3,
    },
    {
      id: "#OU-0941",
      date: "Jan 05, 2023",
      status: "Delivered",
      total: "$45.00",
      items: 1,
    },
    {
      id: "#OU-0822",
      date: "Dec 18, 2022",
      status: "Cancelled",
      total: "$85.00",
      items: 2,
    },
  ];

  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl">
          The Ledger
        </h1>
        <p className="text-muted-foreground text-sm">
          A record of your previous acquisitions and contributions.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="group flex flex-wrap justify-between items-center gap-6 bg-white p-6 border border-border hover:border-primary/50 rounded-sm transition-colors cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Order ID
              </span>
              <span className="font-sans font-bold">
                {order.id}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Date
              </span>
              <span className="text-sm">{order.date}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Status
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Total
              </span>
              <span className="font-sans font-bold text-primary text-sm">
                {order.total}
              </span>
            </div>

            <button
              type="button"
              className="group-hover:bg-primary px-4 py-2 border border-border font-bold group-hover:text-white text-xs uppercase tracking-widest transition-all"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
