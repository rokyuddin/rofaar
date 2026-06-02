"use client";

import { useState } from "react";
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/hooks/use-addresses";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { EmptyState } from "@/components/atoms/empty-state";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Badge } from "@/components/atoms/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog";
import { Skeleton } from "@/components/atoms/skeleton";
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import type { Address } from "@/types/api";

const emptyForm: Omit<Address, "id"> = {
  recipientName: "",
  phone: "",
  address: "",
  city: "",
  area: "",
  label: "",
  isDefault: false,
};

export default function AddressesPage() {
  const { data: addresses, isLoading, error: addressesError, refetch: refetchAddresses } = useAddresses();
  const createAddress = useCreateAddress();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Address | null>(null);
  const [form, setForm] = useState<Omit<Address, "id">>(emptyForm);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (addr: Address) => {
    setEditing(addr);
    setForm({
      recipientName: addr.recipientName,
      phone: addr.phone,
      address: addr.address,
      city: addr.city,
      area: addr.area,
      label: addr.label,
      isDefault: addr.isDefault,
      altPhone: addr.altPhone,
      zone: addr.zone,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateAddress.mutate(
        { ...form, id: editing.id },
        { onSuccess: () => setDialogOpen(false) },
      );
    } else {
      createAddress.mutate(form, { onSuccess: () => setDialogOpen(false) });
    }
  };

  const handleDelete = (id: string) => {
    deleteAddress.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 rounded-none" />
        <div className="grid gap-4 sm:grid-cols-2">
          {["skeleton-1", "skeleton-2", "skeleton-3"].map((k) => (
            <Skeleton key={k} className="h-40 rounded-none" />
          ))}
        </div>
      </div>
    );
  }

  if (addressesError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex items-center gap-4">
            <div className="h-px w-16 bg-destructive/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-destructive">
              Error
            </span>
            <div className="h-px w-16 bg-destructive/40" />
          </div>
          <h1 className="mb-4 text-3xl font-bold font-heading text-foreground">
            Unable to Load Addresses
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            We encountered an issue while loading your addresses. Please try
            again or add a new address.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button onClick={() => refetchAddresses()} size="lg" className="gap-2">
              Try Again
            </Button>
            <Button onClick={openCreate} variant="outline" size="lg" className="gap-2">
              <Plus size={16} />
              Add Address
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <EmptyState
        icon={MapPin}
        title="No addresses saved"
        description="Add a delivery address to make checkout faster."
        action={{ label: "Add Address", href: "#" }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Saved Addresses
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="rounded-none"
          onClick={openCreate}
        >
          <Plus className="mr-1 size-3" />
          Add New
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <Card key={addr.id} className="rounded-none">
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="space-y-0.5">
                <CardTitle className="text-sm">
                  {addr.label || "Address"}
                </CardTitle>
                {addr.isDefault && (
                  <Badge variant="default" className="text-[10px]">
                    Default
                  </Badge>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => openEdit(addr)}
                >
                  <Pencil className="size-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(addr.id)}
                  disabled={deleteAddress.isPending}
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-xs">
              <p className="font-medium">{addr.recipientName}</p>
              <p className="text-muted-foreground">{addr.phone}</p>
              <p className="text-muted-foreground">
                {addr.address}, {addr.area}, {addr.city}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xs uppercase tracking-widest">
              {editing ? "Edit Address" : "New Address"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest">
                  Label
                </Label>
                <Input
                  placeholder="e.g. Home, Office"
                  value={form.label ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, label: e.target.value }))
                  }
                  className="rounded-none"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest">
                  Recipient Name
                </Label>
                <Input
                  value={form.recipientName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, recipientName: e.target.value }))
                  }
                  className="rounded-none"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest">
                  Phone
                </Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="rounded-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest">
                  City
                </Label>
                <Input
                  value={form.city}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, city: e.target.value }))
                  }
                  className="rounded-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest">Area</Label>
              <Input
                value={form.area}
                onChange={(e) =>
                  setForm((f) => ({ ...f, area: e.target.value }))
                }
                className="rounded-none"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest">
                Full Address
              </Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="rounded-none"
                required
              />
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  setForm((f) => ({ ...f, isDefault: e.target.checked }))
                }
                className="accent-primary"
              />
              Set as default address
            </label>
            <DialogFooter>
              <Button
                type="submit"
                className="rounded-none"
                disabled={createAddress.isPending || updateAddress.isPending}
              >
                {editing ? "Save Changes" : "Add Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
