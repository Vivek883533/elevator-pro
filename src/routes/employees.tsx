import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AppHeader } from "@/components/AppHeader";
import {
  useAttendance,
  upsertEmployee,
  deleteEmployee,
  type Employee,
} from "@/lib/attendance/store";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "Employee Directory — Aayush Elevator" },
      {
        name: "description",
        content: "Manage technicians and staff for attendance sheets.",
      },
      { property: "og:title", content: "Employee Directory — Aayush Elevator" },
      {
        property: "og:description",
        content: "Manage technicians and staff for attendance sheets.",
      },
    ],
  }),
  component: EmployeesPage,
});

const inp =
  "h-8 w-full rounded-md border border-transparent bg-transparent px-2 text-sm hover:border-input focus:border-input focus:bg-background focus:outline-none";

function EmployeesPage() {
  const db = useAttendance();
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState({ name: "", role: "", phone: "" });
  const list = (db?.employees ?? []).filter((e) =>
    (e.name + e.role + e.phone).toLowerCase().includes(q.toLowerCase()),
  );
  const upd = (e: Employee, p: Partial<Employee>) =>
    upsertEmployee({ ...e, ...p });
  const add = () => {
    if (!draft.name.trim()) {
      toast.error("Enter a name");
      return;
    }
    upsertEmployee({
      id: "e" + Date.now().toString(36),
      ...draft,
      active: true,
    });
    setDraft({ name: "", role: "", phone: "" });
    toast.success("Employee added");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader subtitle="Employee Directory" />
      <main className="mx-auto max-w-5xl space-y-4 px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Employee Directory</h1>
            <p className="text-sm text-muted-foreground">
              Active employees appear on attendance sheets automatically.
              Inactive employees keep their past attendance.
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-8 w-56 rounded-md border border-input bg-card pl-8 pr-2 text-sm"
            />
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Role / Designation</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Status</th>
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {!db && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-muted-foreground"
                  >
                    Loading…
                  </td>
                </tr>
              )}
              {list.map((e) => (
                <tr
                  key={e.id}
                  className={
                    "border-t border-border " + (e.active ? "" : "opacity-60")
                  }
                >
                  <td className="p-1.5">
                    <input
                      className={inp + " font-medium"}
                      value={e.name}
                      onChange={(x) => upd(e, { name: x.target.value })}
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      className={inp}
                      value={e.role}
                      onChange={(x) => upd(e, { role: x.target.value })}
                    />
                  </td>
                  <td className="p-1.5">
                    <input
                      className={inp + " font-mono"}
                      value={e.phone}
                      onChange={(x) => upd(e, { phone: x.target.value })}
                    />
                  </td>
                  <td className="p-1.5">
                    <label className="flex items-center gap-2 text-xs font-semibold">
                      <Switch
                        checked={e.active}
                        onCheckedChange={(v) => upd(e, { active: v })}
                      />
                      <span
                        className={
                          e.active ? "text-success" : "text-muted-foreground"
                        }
                      >
                        {e.active ? "Active" : "Inactive"}
                      </span>
                    </label>
                  </td>
                  <td className="p-1.5">
                    <button
                      title="Delete"
                      onClick={() => {
                        if (
                          confirm(
                            `Delete ${e.name}? Consider marking Inactive to keep history.`,
                          )
                        )
                          deleteEmployee(e.id);
                      }}
                      className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="border-t border-border bg-muted/40">
                <td className="p-1.5">
                  <input
                    className={inp + " border-input bg-background"}
                    placeholder="Full name"
                    value={draft.name}
                    onChange={(x) =>
                      setDraft({ ...draft, name: x.target.value })
                    }
                  />
                </td>
                <td className="p-1.5">
                  <input
                    className={inp + " border-input bg-background"}
                    placeholder="Role"
                    value={draft.role}
                    onChange={(x) =>
                      setDraft({ ...draft, role: x.target.value })
                    }
                  />
                </td>
                <td className="p-1.5">
                  <input
                    className={inp + " border-input bg-background"}
                    placeholder="Phone"
                    value={draft.phone}
                    onChange={(x) =>
                      setDraft({ ...draft, phone: x.target.value })
                    }
                    onKeyDown={(x) => x.key === "Enter" && add()}
                  />
                </td>
                <td className="p-1.5" colSpan={2}>
                  <Button size="sm" onClick={add}>
                    <Plus className="h-4 w-4" />
                    Add employee
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
