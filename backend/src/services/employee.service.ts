import { db } from "../config/firebase";

function formatFirestoreDate(val: any): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  const seconds = val._seconds ?? val.seconds;
  if (typeof seconds === "number") {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(seconds * 1000));
  }
  return "";
}

function mapProjectStatus(status?: string): "In Progress" | "Near Deadline" | "Completed" {
  switch ((status || "").toLowerCase()) {
    case "completed":
      return "Completed";
    case "near-deadline":
      return "Near Deadline";
    default:
      return "In Progress";
  }
}

function mapTaskStatus(status?: string): "To Do" | "In Progress" | "Under Review" | "Completed" {
  switch ((status || "").toLowerCase()) {
    case "in-progress":
      return "In Progress";
    case "under-review":
      return "Under Review";
    case "completed":
      return "Completed";
    default:
      return "To Do";
  }
}

function mapPriority(priority?: string): "Low" | "Medium" | "High" {
  switch ((priority || "").toLowerCase()) {
    case "high":
      return "High";
    case "low":
      return "Low";
    default:
      return "Medium";
  }
}

export async function getEmployeeDashboard(employeeUid: string) {
  // 1. Fetch user profile
  const userDoc = await db.collection("users").doc(employeeUid).get();
  const userData = userDoc.data() || {};

  // 2. Fetch contracts issued to this employee
  const contractsSnap = await db
    .collection("contracts")
    .where("employeeUid", "==", employeeUid)
    .get();

  const rawContracts = contractsSnap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) }))
    .sort((a, b) => {
      const aSec = a.createdAt?._seconds ?? a.createdAt?.seconds ?? 0;
      const bSec = b.createdAt?._seconds ?? b.createdAt?.seconds ?? 0;
      return bSec - aSec;
    });

  // Map contracts by projectCode for role & remuneration lookups
  const contractByProjectCode = new Map<string, any>();
  for (const c of rawContracts) {
    if (c.projectCode && !contractByProjectCode.has(c.projectCode)) {
      contractByProjectCode.set(c.projectCode, c);
    }
  }

  // 3. Fetch projects where `assignedTo` contains employeeUid (set when contract is signed)
  const projectsSnap = await db
    .collection("projects")
    .where("assignedTo", "array-contains", employeeUid)
    .get();

  const rawProjects = projectsSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

  // 4. Fetch tasks where `assignedTo == employeeUid`
  const tasksSnap = await db
    .collection("tasks")
    .where("assignedTo", "==", employeeUid)
    .get();

  const rawTasks = tasksSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

  // 5. Fetch salaries disbursed to this employee
  const salarySnap = await db
    .collection("salaries")
    .where("employeeUid", "==", employeeUid)
    .get();

  const salaries = salarySnap.docs
    .map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        ...data,
        paidAtFormatted: formatFirestoreDate(data.paidAt),
      };
    })
    .sort((a: any, b: any) => {
      const aTime = a.paidAt?._seconds ?? a.paidAt?.seconds ?? 0;
      const bTime = b.paidAt?._seconds ?? b.paidAt?.seconds ?? 0;
      return bTime - aTime;
    });

  const latestSalary = salaries[0] || null;

  // 6. Fetch payment timeline entries linked to employee's projects
  const projectIds = rawProjects.map((p) => p.id);
  let paymentEntries: any[] = [];
  if (projectIds.length > 0) {
    const chunks: string[][] = [];
    for (let i = 0; i < projectIds.length; i += 30) {
      chunks.push(projectIds.slice(i, i + 30));
    }
    const entrySnaps = await Promise.all(
      chunks.map((chunk) =>
        db.collection("payment_entries").where("projectId", "in", chunk).get()
      )
    );
    paymentEntries = entrySnaps.flatMap((snap) =>
      snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))
    );
  }

  // Normalize tasks for frontend (keep unassigned-project tasks under "GENERAL")
  const tasks = rawTasks.map((t: any) => {
    const matchedProj =
      rawProjects.find(
        (p) =>
          (t.projectCode && p.code === t.projectCode) ||
          (t.projectId && p.id === t.projectId)
      ) || null;

    return {
      id: t.id,
      title: t.title || "",
      description: t.description || "",
      projectCode: t.projectCode || matchedProj?.code || "GENERAL",
      projectTitle: t.projectTitle || matchedProj?.title || "General Assigned Tasks",
      milestone: t.milestone || t.description || "Assigned Deliverable",
      dueDate: t.dueDate || "",
      priority: mapPriority(t.priority),
      status: mapTaskStatus(t.status),
      rawStatus: t.status || "todo",
    };
  });

  // Normalize projects for frontend
  const projects = rawProjects.map((p: any) => {
    const linkedContract = contractByProjectCode.get(p.code);
    const projTasks = tasks.filter((t) => t.projectCode === p.code);
    const doneTasks = projTasks.filter((t) => t.status === "Completed").length;
    const isCompleted = (p.status || "").toLowerCase() === "completed";

    const progressPercent = isCompleted
      ? 100
      : projTasks.length > 0
      ? Math.round((doneTasks / projTasks.length) * 100)
      : 0;

    return {
      id: p.id,
      code: p.code || "PRJ-0000",
      title: p.title || "Untitled Project",
      description: p.description || "",
      clientName: p.clientName || "—",
      role: linkedContract?.employeeRole || userData.title || "Team Member",
      remuneration: Number(linkedContract?.remuneration ?? p.amount ?? 0),
      startDate: p.startDate || linkedContract?.startDate || "",
      dueDate: p.endDate || linkedContract?.endDate || "",
      endDate: p.endDate || linkedContract?.endDate || "",
      status: mapProjectStatus(p.status),
      progressPercent,
      milestones: projTasks.map((t) => ({
        name: t.title,
        done: t.status === "Completed",
      })),
    };
  });

  // Normalize contracts for frontend ContractDocument interface
  const contracts = rawContracts.map((c: any) => {
    const isSigned = c.status === "signed" || c.party2Employee?.status === "Signed";
    const statusLabel: "Pending Acceptance" | "Active & Binding" | "Completed" = isSigned
      ? "Active & Binding"
      : "Pending Acceptance";

    return {
      id: c.id,
      docId: c.projectCode ? `AGR-${c.projectCode}` : c.id.slice(0, 10).toUpperCase(),
      title: c.title || "Project Assignment Contract",
      category: c.agreementType || "Project Assignment Contract",
      effectiveDate: c.contractDate || formatFirestoreDate(c.createdAt),
      status: statusLabel,
      rawStatus: c.status,
      description: c.scopeDetails || "",
      projectCode: c.projectCode || "",
      projectTitle: c.projectTitle || "",
      clientName: c.clientName || "",
      projectRole: c.employeeRole || "",
      projectPayout: Number(c.remuneration || 0),
      startDate: c.startDate || "",
      endDate: c.endDate || "",
      dueDate: c.endDate || "",
      isSigned,
      signedAt: c.party2Employee?.signedDate || "",
      employeeName: c.employeeName || userData.displayName || "",
      employeeTitle: c.employeeRole || userData.title || "",
      employeeEmail: c.employeeEmail || userData.email || "",
      employeePhone: c.employeePhone || userData.contactNo || "",
      employeeUid: c.employeeUid || employeeUid,
    };
  });

  // Calculate dynamic KPIs
  const totalDisbursed = salaries
    .filter((s: any) => s.status === "paid")
    .reduce((sum: number, s: any) => sum + Number(s.amount || 0), 0);

  const totalProjectValue = contracts
    .filter((c: any) => c.isSigned)
    .reduce((sum: number, c: any) => sum + Number(c.projectPayout || 0), 0);

  const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const activeProjects = projects.filter((p) => p.status !== "Completed").length;
  const inProgressProjects = projects.filter(
    (p) => p.status === "In Progress" || p.status === "Near Deadline"
  ).length;
  const completedProjects = projects.filter((p) => p.status === "Completed").length;

  const now = new Date();
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const dueThisWeekTasks = tasks.filter((t) => {
    if (t.status === "Completed" || !t.dueDate) return false;
    const due = new Date(t.dueDate);
    return !Number.isNaN(due.getTime()) && due <= oneWeekFromNow;
  }).length;

  const completionPct =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return {
    user: {
      uid: employeeUid,
      displayName: userData.displayName || "Employee",
      email: userData.email || "",
      title: userData.title || "Team Member",
      baseSalary: Number(userData.baseSalary || 0),
      contactNo: userData.contactNo || "",
      contactEmail: userData.contactEmail || userData.email || "",
      portfolioUrl: userData.portfolioUrl || "",
      bio: userData.bio || "",
    },
    stats: {
      monthlySalary: Number(userData.baseSalary || 0),
      projectEarnings: totalDisbursed,
      totalProjectValue: Math.max(totalProjectValue, totalDisbursed),
      activeProjects,
      inProgressProjects,
      completedProjects,
      pendingTasks,
      completedTasks,
      dueThisWeekTasks,
      sprintVelocity: tasks.length > 0 ? `${completionPct}% completion rate` : "No tasks yet",
    },
    projects,
    tasks,
    contracts,
    paymentEntries,
    latestSalary,
    salaryHistory: salaries,
  };
}