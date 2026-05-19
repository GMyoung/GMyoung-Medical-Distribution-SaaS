import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeDollarSign,
  Bell,
  BookOpenCheck,
  Boxes,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Copy,
  CreditCard,
  Database,
  FileCheck2,
  Filter,
  Gauge,
  Globe,
  GraduationCap,
  Hash,
  Home,
  Link,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  PackageCheck,
  PanelLeftClose,
  Plus,
  QrCode,
  Search,
  Send,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Store,
  UserRound,
  Users,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

type Workspace = "admin" | "rep" | "provider" | "storefront";
type StatusTone = "success" | "warning" | "danger" | "info" | "neutral" | "purple";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type Order = {
  id: string;
  source: string;
  organization: string;
  customer: string;
  rep: string;
  provider: string;
  total: string;
  commission: string;
  status: string;
  date: string;
  attribution: string;
};

type Product = {
  name: string;
  code: string;
  category: string;
  price: number;
  cost: number;
  requiresRx: boolean;
  benefit: string;
  frequency: string;
};

const navByWorkspace: Record<Workspace, NavItem[]> = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: Gauge },
    { id: "customers", label: "Customers", icon: Building2 },
    { id: "prospects", label: "Prospects", icon: ClipboardList },
    { id: "team", label: "Team", icon: Users },
    { id: "products", label: "Products", icon: Boxes },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "commissions", label: "Commissions", icon: CircleDollarSign },
    { id: "learning", label: "Training", icon: GraduationCap },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "audit", label: "Audit Logs", icon: FileCheck2 },
  ],
  rep: [
    { id: "dashboard", label: "Dashboard", icon: Gauge },
    { id: "customers", label: "Customers", icon: Building2 },
    { id: "prospects", label: "Prospects", icon: ClipboardList },
    { id: "team", label: "Team", icon: Users },
    { id: "my-business", label: "My Business", icon: Store },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "commissions", label: "Commissions", icon: CircleDollarSign },
    { id: "learning", label: "Learning", icon: GraduationCap },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ],
  provider: [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "patients", label: "Patients", icon: Users },
    { id: "visits", label: "Visits", icon: Stethoscope },
    { id: "visit", label: "Visit Room", icon: Video },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "marketing", label: "Marketing", icon: QrCode },
    { id: "learning", label: "Learning", icon: GraduationCap },
  ],
  storefront: [
    { id: "store", label: "Storefront", icon: Store },
    { id: "apply", label: "Recruit Page", icon: UserRound },
    { id: "checkout", label: "Checkout", icon: CreditCard },
  ],
};

const products: Product[] = [
  {
    name: "Beauty - GHK-Cu",
    code: "INSTA-GHK-CU",
    category: "Beauty",
    price: 139,
    cost: 69,
    requiresRx: false,
    benefit: "Skin, hair, nails, and visible recovery support.",
    frequency: "5 days on, 2 days off",
  },
  {
    name: "Energy - NAD+",
    code: "INSTA-NAD",
    category: "Energy",
    price: 118,
    cost: 59,
    requiresRx: false,
    benefit: "Cellular energy and mitochondrial support.",
    frequency: "Daily AM strip",
  },
  {
    name: "Focus - Selank/Semax",
    code: "INSTA-SELANK-SEMAX",
    category: "Cognitive",
    price: 198,
    cost: 99,
    requiresRx: false,
    benefit: "Cognitive performance, mood, and focus support.",
    frequency: "5 days on, 2 days off",
  },
  {
    name: "Immune - Thymosin Alpha-1",
    code: "INSTA-TA1",
    category: "Immune",
    price: 198,
    cost: 99,
    requiresRx: false,
    benefit: "Immune defense and regenerative health support.",
    frequency: "5 days on, 2 days off",
  },
  {
    name: "Intimacy - PT-141+",
    code: "INSTA-PT141",
    category: "Intimacy",
    price: 159,
    cost: 79,
    requiresRx: false,
    benefit: "Hormone balance and sexual wellness support.",
    frequency: "As directed",
  },
  {
    name: "Metabolic - Ultratrutide GLP-3",
    code: "INSTA-ULTRATRUTIDE",
    category: "Metabolic",
    price: 590,
    cost: 295,
    requiresRx: true,
    benefit: "Weight management program product.",
    frequency: "Provider-directed",
  },
];

const orders: Order[] = [
  {
    id: "GFT-BAD-20260511-003",
    source: "Clinic QR",
    organization: "Badger Mobile Wound Care, PLLC",
    customer: "William Sallis",
    rep: "Jonathan Balucanag",
    provider: "Dr. Elaine Morse",
    total: "$1,980.00",
    commission: "$326.70",
    status: "Shipped",
    date: "May 11, 2026",
    attribution: "Clinic QR > Rep > Distributor",
  },
  {
    id: "STR-JON-20260511-118",
    source: "Rep Storefront",
    organization: "Direct Customer",
    customer: "Andrew Sinichar",
    rep: "Jonathan Balucanag",
    provider: "-",
    total: "$316.00",
    commission: "$61.75",
    status: "Paid",
    date: "May 11, 2026",
    attribution: "Rep Storefront",
  },
  {
    id: "PRO-ADV-20260505-001",
    source: "Provider Order",
    organization: "Advocate Wound Care LLC",
    customer: "Maria Jensen",
    rep: "Chris Ziccardi",
    provider: "Dr. Robert Hale",
    total: "$21,600.00",
    commission: "$2,160.00",
    status: "Processing",
    date: "May 5, 2026",
    attribution: "Provider Order > Rep Override",
  },
  {
    id: "API-EXT-20260427-002",
    source: "External Cart API",
    organization: "Heal Medical Group",
    customer: "Tara Lee",
    rep: "Jonathan Balucanag",
    provider: "Dr. Newbold",
    total: "$540.00",
    commission: "$78.20",
    status: "Needs Review",
    date: "Apr 27, 2026",
    attribution: "Approved External Store",
  },
];

const customers = [
  {
    organization: "1 peptide test",
    status: "Active",
    contact: "973-464-2345",
    rep: "Jonathan Balucanag",
    location: "Main Office",
    created: "Apr 16, 2026",
  },
  {
    organization: "Advocate Wound Care LLC",
    status: "Active",
    contact: "rwarren@mnucstaffing.com",
    rep: "Chris Ziccardi",
    location: "No address",
    created: "Feb 9, 2026",
  },
  {
    organization: "Alertive Healthcare Medical Group, APC",
    status: "Active",
    contact: "woundcare@alertivehealth.org",
    rep: "Jonathan Balucanag",
    location: "No address",
    created: "Feb 9, 2026",
  },
  {
    organization: "Graham Health, LLC",
    status: "Active",
    contact: "christopher@ghmobile.org",
    rep: "Jonathan Balucanag",
    location: "No address",
    created: "Feb 9, 2026",
  },
];

const commissionRows = [
  ["STR-JON-20260511-118", "Direct revenue share", "Jonathan Balucanag", "$34.20", "Pending"],
  ["STR-JON-20260511-118", "Markup commission", "Jonathan Balucanag", "$27.55", "Pending"],
  ["GFT-BAD-20260511-003", "Provider share", "Dr. Elaine Morse", "$198.00", "Approved"],
  ["GFT-BAD-20260511-003", "Distributor override", "Joshua Tan", "$79.20", "Approved"],
  ["PRO-ADV-20260505-001", "Affiliate override", "Chris Ziccardi", "$216.00", "Paid"],
];

function App() {
  const [workspace, setWorkspace] = useState<Workspace>("admin");
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const navItems = navByWorkspace[workspace];
  const activePage = navItems.some((item) => item.id === page) ? page : navItems[0].id;

  function switchWorkspace(next: Workspace) {
    setWorkspace(next);
    setPage(navByWorkspace[next][0].id);
    setSidebarOpen(false);
  }

  return (
    <div className="app-shell">
      {workspace !== "storefront" && (
        <Sidebar
          workspace={workspace}
          activePage={activePage}
          navItems={navItems}
          open={sidebarOpen}
          onNavigate={(next) => {
            setPage(next);
            setSidebarOpen(false);
          }}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      <div className={workspace === "storefront" ? "main full" : "main"}>
        {workspace !== "storefront" && (
          <Topbar
            workspace={workspace}
            onMenu={() => setSidebarOpen(true)}
            onWorkspace={switchWorkspace}
          />
        )}
        {workspace !== "storefront" && workspace !== "provider" && (
          <ImpersonationBar />
        )}
        <main className="content">
          <PageRenderer
            workspace={workspace}
            page={activePage}
            onCreateOrder={() => setModalOpen(true)}
            onWorkspace={switchWorkspace}
          />
        </main>
        {workspace !== "storefront" && (
          <MobileNav
            items={navItems.slice(0, 5)}
            activePage={activePage}
            onNavigate={setPage}
          />
        )}
      </div>
      {modalOpen && <CreateOrderModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

function PageRenderer({
  workspace,
  page,
  onCreateOrder,
  onWorkspace,
}: {
  workspace: Workspace;
  page: string;
  onCreateOrder: () => void;
  onWorkspace: (workspace: Workspace) => void;
}) {
  if (workspace === "storefront") return <Storefront onWorkspace={onWorkspace} />;
  if (workspace === "provider" && page === "visit") return <ProviderVisit />;
  if (workspace === "provider") return <ProviderDashboard onCreateOrder={onCreateOrder} />;
  if (page === "orders" || page === "products") return <OrdersProducts onCreateOrder={onCreateOrder} />;
  if (page === "customers") return <CustomersPage />;
  if (page === "commissions") return <CommissionsPage />;
  if (page === "my-business") return <MyBusinessPage />;
  if (page === "learning") return <LearningPage />;
  if (page === "messages") return <MessagesPage />;
  if (page === "team") return <TeamPage />;
  if (page === "prospects") return <ProspectsPage />;
  if (page === "audit") return <AuditPage />;
  return <Dashboard workspace={workspace} onCreateOrder={onCreateOrder} />;
}

function Sidebar({
  workspace,
  navItems,
  activePage,
  open,
  onNavigate,
  onClose,
}: {
  workspace: Workspace;
  navItems: NavItem[];
  activePage: string;
  open: boolean;
  onNavigate: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            {workspace === "provider" ? <Stethoscope size={21} /> : <Building2 size={21} />}
          </div>
          <div>
            <strong>Plya Med</strong>
            <span>{workspace === "admin" ? "Company Portal" : workspace === "rep" ? "Rep Portal" : "Clinic Portal"}</span>
          </div>
          <button className="icon-button close-mobile" onClick={onClose} aria-label="Close navigation">
            <X size={18} />
          </button>
        </div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <button
              className={`nav-item ${activePage === item.id ? "active" : ""}`}
              key={item.id}
              onClick={() => onNavigate(item.id)}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="impersonate-button">
          <ShieldCheck size={18} />
          Impersonate
        </button>
      </aside>
      {open && <button className="scrim" onClick={onClose} aria-label="Close overlay" />}
    </>
  );
}

function Topbar({
  workspace,
  onMenu,
  onWorkspace,
}: {
  workspace: Workspace;
  onMenu: () => void;
  onWorkspace: (workspace: Workspace) => void;
}) {
  return (
    <header className="topbar">
      <button className="icon-button menu-button" onClick={onMenu} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <div className="topbar-title">
        <span>{workspace === "provider" ? "Main Office" : "Company Portal"}</span>
        <small>{workspace === "provider" ? "1 peptide test" : "Medical product commerce OS"}</small>
      </div>
      <div className="global-search">
        <Search size={18} />
        <input placeholder="Search orders, patients, reps, clinics..." />
      </div>
      <div className="role-switcher">
        <button className={workspace === "admin" ? "active" : ""} onClick={() => onWorkspace("admin")}>
          Admin
        </button>
        <button className={workspace === "rep" ? "active" : ""} onClick={() => onWorkspace("rep")}>
          Rep
        </button>
        <button className={workspace === "provider" ? "active" : ""} onClick={() => onWorkspace("provider")}>
          Provider
        </button>
        <button onClick={() => onWorkspace("storefront")}>Store</button>
      </div>
      <div className="topbar-actions">
        <button className="pill-button compact">
          <Users size={16} /> 1 new rep
        </button>
        <button className="icon-button">
          <Moon size={18} />
        </button>
        <button className="icon-button">
          <Bell size={18} />
        </button>
        <div className="avatar">C</div>
        <div className="user-block">
          <strong>chris</strong>
          <span>{workspace === "admin" ? "System Admin" : "sales_rep"}</span>
        </div>
        <button className="ghost-action">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </header>
  );
}

function ImpersonationBar() {
  return (
    <div className="impersonation-bar">
      <Users size={17} />
      <strong>Impersonation Active</strong>
      <span>You are viewing as jonathan@eloramedical.net</span>
      <span>Session started by chris@eloramedical.net</span>
      <button>End Session</button>
    </div>
  );
}

function Dashboard({
  workspace,
  onCreateOrder,
}: {
  workspace: Workspace;
  onCreateOrder: () => void;
}) {
  const isRep = workspace === "rep";
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow={isRep ? "Rep operating view" : "Admin command center"}
        title={isRep ? "Jonathan Balucanag Dashboard" : "Company Dashboard"}
        description="Track attribution, paid orders, clinic activity, commission state, and operational exceptions from one console."
        actions={
          <>
            <button className="secondary-button">
              <Filter size={17} /> Filter
            </button>
            <button className="primary-button" onClick={onCreateOrder}>
              <Plus size={17} /> Create Order
            </button>
          </>
        }
      />
      <div className="quick-actions">
        <button className="outline-chip" onClick={onCreateOrder}>
          <Plus size={17} /> Create Order
        </button>
        <button className="outline-chip">
          <ShoppingCart size={17} /> Review Orders
        </button>
        <button className="outline-chip">
          <Building2 size={17} /> Customers
        </button>
        <button className="outline-chip">
          <CircleDollarSign size={17} /> Commissions
        </button>
      </div>
      <div className="metric-grid five">
        <MetricCard icon={ShoppingCart} label="Total Orders" value={isRep ? "12" : "1,248"} tone="neutral" />
        <MetricCard icon={AlertTriangle} label="Pending Review" value={isRep ? "1" : "14"} tone="warning" />
        <MetricCard icon={Check} label="Approved" value={isRep ? "8" : "921"} tone="success" />
        <MetricCard icon={Activity} label="Processing" value={isRep ? "3" : "66"} tone="info" />
        <MetricCard icon={PackageCheck} label="Shipped" value={isRep ? "10" : "1,012"} tone="purple" />
      </div>
      <div className="hero-metric-grid">
        <HeroMetric title={isRep ? "Active Accounts" : "Organizations"} value={isRep ? "6" : "81"} cta="View customers" icon={Building2} />
        <HeroMetric title={isRep ? "This Month" : "Total Sales"} value={isRep ? "$18,420" : "$48,240"} cta="Open ledger" icon={BadgeDollarSign} />
        <HeroMetric title="Total Patients" value={isRep ? "22" : "310"} cta="Provider view" icon={Users} />
      </div>
      <div className="dashboard-grid">
        <Panel title="Recent Activity" icon={Activity}>
          <ActivityList />
        </Panel>
        <Panel title="Metrics" icon={Gauge}>
          <ProgressMetric label="Total Sales" value="$48,240" percent={82} />
          <ProgressMetric label="Active Accounts" value="77" percent={64} />
          <ProgressMetric label="Growth Rate" value="-12%" percent={28} danger />
          <ProgressMetric label="Active Reps" value="21" percent={78} />
        </Panel>
        <Panel title="Needs Attention" icon={AlertTriangle}>
          <div className="attention-card success">
            <ShieldCheck size={22} />
            <div>
              <strong>All Systems Green</strong>
              <span>No critical issues detected</span>
            </div>
          </div>
          <div className="attention-card">
            <AlertTriangle size={22} />
            <div>
              <strong>1 payout verification pending</strong>
              <span>PIETA LLC test deposit not confirmed</span>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

function OrdersProducts({ onCreateOrder }: { onCreateOrder: () => void }) {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Order operations"
        title="Orders / Products"
        description="Manage app orders, public storefront orders, product routing, review state, and fulfillment handoff."
        actions={
          <>
            <button className="secondary-button">
              <Bell size={17} /> Configure Notifications
            </button>
            <button className="primary-button" onClick={onCreateOrder}>
              <Plus size={17} /> Create Order
            </button>
          </>
        }
      />
      <div className="tabs">
        <button className="active">
          <ShoppingCart size={17} /> App Orders
        </button>
        <button>
          <Globe size={17} /> Public Orders
        </button>
        <button>
          <Boxes size={17} /> Products
        </button>
        <button>
          <CircleDollarSign size={17} /> Pricing
        </button>
      </div>
      <div className="metric-grid six">
        <MetricCard icon={Database} label="Total Orders" value="10" tone="neutral" />
        <MetricCard icon={Activity} label="New Today" value="0" tone="success" />
        <MetricCard icon={AlertTriangle} label="Needs Review" value="0" tone="warning" />
        <MetricCard icon={Check} label="Approved" value="0" tone="success" />
        <MetricCard icon={Activity} label="Processing" value="0" tone="info" />
        <MetricCard icon={Send} label="Shipped" value="10" tone="purple" />
      </div>
      <SearchFilterBar placeholder="Search by order #, patient, organization, rep, attribution..." />
      <ResponsiveTable
        columns={["Order", "Organization", "Sales Rep", "Total", "Status", "Date", "Actions"]}
        rows={orders.map((order) => [
          <RecordTitle title={order.id} subtitle={order.source} />,
          order.organization,
          order.rep,
          order.total,
          <StatusBadge tone={order.status === "Needs Review" ? "warning" : order.status === "Processing" ? "info" : "purple"}>
            {order.status}
          </StatusBadge>,
          order.date,
          <div className="row-actions">
            <button className="icon-button small"><MessageSquare size={16} /></button>
            <button className="icon-button small danger"><X size={16} /></button>
          </div>,
        ])}
        mobileTitleIndex={0}
      />
    </section>
  );
}

function CustomersPage() {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Clinic and customer ownership"
        title="Customers"
        description="Every record keeps assigned rep, clinic relationship, status, and purchase source visible."
        actions={<button className="primary-button"><Plus size={17} /> Add New Customer</button>}
      />
      <div className="metric-grid four">
        <MetricCard icon={Building2} label="Total Customers" value="6" tone="neutral" />
        <MetricCard icon={Check} label="Active" value="6" tone="success" />
        <MetricCard icon={X} label="Inactive" value="0" tone="danger" />
        <MetricCard icon={Activity} label="Pending / Trial" value="0" tone="warning" />
      </div>
      <SearchFilterBar placeholder="Search by organization name, email, phone, or rep..." />
      <ResponsiveTable
        columns={["Organization", "Status", "Contact", "Rep", "Location", "Created"]}
        rows={customers.map((customer) => [
          <RecordTitle title={customer.organization} subtitle="0 users, 1 location" icon={Building2} />,
          <StatusBadge tone="success">{customer.status}</StatusBadge>,
          customer.contact,
          customer.rep,
          customer.location,
          customer.created,
        ])}
        mobileTitleIndex={0}
      />
    </section>
  );
}

function CommissionsPage() {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Commission ledger"
        title="Multi-recipient commission events"
        description="One paid order can create revenue share, markup, provider share, distributor override, and affiliate entries."
        actions={<button className="secondary-button"><FileCheck2 size={17} /> Export Ledger</button>}
      />
      <div className="metric-grid four">
        <MetricCard icon={CircleDollarSign} label="Pending" value="$7,420" tone="warning" />
        <MetricCard icon={Check} label="Approved" value="$12,880" tone="success" />
        <MetricCard icon={CreditCard} label="Paid Out" value="$38,100" tone="info" />
        <MetricCard icon={AlertTriangle} label="Reversed" value="$0" tone="danger" />
      </div>
      <Panel title="Ledger Entries" icon={Database}>
        <ResponsiveTable
          columns={["Order", "Type", "Recipient", "Amount", "Status"]}
          rows={commissionRows.map((row) => [
            row[0],
            row[1],
            row[2],
            <strong>{row[3]}</strong>,
            <StatusBadge tone={row[4] === "Paid" ? "success" : row[4] === "Approved" ? "info" : "warning"}>{row[4]}</StatusBadge>,
          ])}
          mobileTitleIndex={0}
        />
      </Panel>
    </section>
  );
}

function MyBusinessPage() {
  return (
    <section className="page-stack narrow">
      <PageHeader
        eyebrow="Rep profile"
        title="My Business"
        description="Your contact info, public pages, team, commissions, payment details, and agreements in one place."
      />
      <Panel title="Contact info" icon={UserRound}>
        <div className="form-grid">
          <LabelInput label="Name" value="Jonathan Balucanag" helper="Contact an admin to change" />
          <LabelInput label="Email" value="jonathan@eloramedical.net" helper="Contact an admin to change" />
          <LabelInput label="Phone" value="4804407177" helper="Shown on storefront and business card" wide />
        </div>
      </Panel>
      <Panel title="My public pages" icon={Globe}>
        <UrlRow label="Customer Storefront" url="https://jonathan-balucanag.plyamed.com" />
        <UrlRow label="Recruit Page" url="https://jonathan-balucanag.plyamed.com/recruit" />
        <UrlRow label="Clinic QR Page" url="https://plyamed.com/q/main-office-adv" />
      </Panel>
      <Panel title="Payment information" icon={CreditCard}>
        <div className="ledger-card">
          <div>
            <strong>PIETA LLC</strong>
            <span>Checking · Routing 322271627 · Account ****2007</span>
          </div>
          <StatusBadge tone="warning">Pending verification</StatusBadge>
          <button className="secondary-button">Update</button>
        </div>
      </Panel>
      <Panel title="Rep agreements" icon={FileCheck2}>
        <AgreementRow title="Sales Rep Agreement" />
        <AgreementRow title="W-9 Tax Form" />
      </Panel>
    </section>
  );
}

function ProviderDashboard({ onCreateOrder }: { onCreateOrder: () => void }) {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Clinic flow"
        title="Provider Dashboard"
        description="Waiting room QR purchases, telehealth visits, patient ordering, and payment links are managed from this portal."
        actions={
          <>
            <button className="secondary-button"><CalendarDays size={17} /> Schedule</button>
            <button className="primary-button" onClick={onCreateOrder}><ShoppingCart size={17} /> New Order</button>
          </>
        }
      />
      <div className="visit-tabs">
        {["All Active 1", "Waiting 0", "In Progress 1", "Telehealth 1", "Completed 0"].map((tab, index) => (
          <button key={tab} className={index === 0 ? "active" : ""}>{tab}</button>
        ))}
      </div>
      <div className="provider-grid">
        <div className="patient-queue">
          <PatientCard />
          <Panel title="Clinic QR purchases" icon={QrCode}>
            <div className="mini-list">
              <RecordTitle title="Andrew Sinichar" subtitle="Energy - NAD+ and Focus - Selank/Semax · $316.00" />
              <RecordTitle title="Maria Jensen" subtitle="Beauty - GHK-Cu · Waiting room QR" />
              <RecordTitle title="Tara Lee" subtitle="Immune - Thymosin Alpha-1 · Payment link sent" />
            </div>
          </Panel>
        </div>
        <Panel title="Today's Schedule" icon={CalendarDays}>
          <ScheduleView />
        </Panel>
      </div>
    </section>
  );
}

function ProviderVisit() {
  const [selected, setSelected] = useState(["Energy - NAD+", "Focus - Selank/Semax"]);
  const selectedProducts = useMemo(
    () => products.filter((product) => selected.includes(product.name)),
    [selected],
  );
  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0);

  return (
    <section className="page-stack">
      <div className="patient-header">
        <div className="avatar large">A</div>
        <div>
          <h1>Andrew Sinichar</h1>
          <p>35y · 11/10/1990 · 917-969-5702</p>
          <div className="inline-tags">
            <StatusBadge tone="success">in-progress</StatusBadge>
            <StatusBadge tone="info">Telehealth</StatusBadge>
            <span>Started 1:27 PM</span>
          </div>
        </div>
        <span className="mrn">MRN: ADV-20260422-0001</span>
      </div>
      <div className="visit-grid">
        <Panel title="Telehealth" icon={Video}>
          <div className="video-room">
            <span>Waiting for patient...</span>
            <div className="video-preview">Chris Ziccardi</div>
            <div className="call-actions">
              <button><Video size={18} /></button>
              <button><MessageSquare size={18} /></button>
              <button className="danger"><X size={18} /></button>
            </div>
          </div>
        </Panel>
        <Panel title="Visit Notes" icon={ClipboardCheck}>
          <div className="notes-grid">
            <textarea placeholder="Patient goals..." />
            <textarea placeholder="Assessment, discussion, clinical reasoning..." />
            <input placeholder="Follow-up, e.g. 4 weeks to assess response" />
          </div>
          <div className="panel-actions">
            <button className="secondary-button">Save Draft</button>
            <button className="primary-button">Sign</button>
          </div>
        </Panel>
      </div>
      <Panel title="Prescribe & Order" icon={Link}>
        <div className="order-builder">
          <div>
            <div className="category-pills">
              {["All", "Weight Loss", "Sexual Health", "Anti-Aging", "Hair Loss", "Sleep & Recovery", "Energy & Metabolic", "Immune Support"].map((item) => (
                <button className={item === "All" ? "active" : ""} key={item}>{item}</button>
              ))}
            </div>
            <div className="product-list">
              {products.map((product) => {
                const active = selected.includes(product.name);
                return (
                  <button
                    className={`product-row ${active ? "selected" : ""}`}
                    key={product.code}
                    onClick={() =>
                      setSelected((current) =>
                        current.includes(product.name)
                          ? current.filter((item) => item !== product.name)
                          : [...current, product.name],
                      )
                    }
                  >
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.code}</small>
                    </span>
                    <span>${product.price.toFixed(2)} {active ? <Check size={16} /> : <Plus size={16} />}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="payment-pane">
            <label>Payment Method</label>
            <div className="segmented">
              <button className="active">Pay Now</button>
              <button>Email Link</button>
            </div>
            <input defaultValue="Andrew@eloramedical.net" />
            <label>Ship To</label>
            <input defaultValue="andrew Sinichar" />
            <input defaultValue="9700 N 91st St Unit A-115" />
            <div className="three-col">
              <input defaultValue="Scottsdale" />
              <input defaultValue="AZ" />
              <input defaultValue="85258" />
            </div>
            <div className="cart-lines">
              {selectedProducts.map((product) => (
                <div key={product.code}>
                  <span>{product.name}</span>
                  <strong>${product.price.toFixed(2)}</strong>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Patient pays</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <button className="primary-button full-width">Finalize & Pay Now</button>
          </div>
        </div>
      </Panel>
    </section>
  );
}

function Storefront({ onWorkspace }: { onWorkspace: (workspace: Workspace) => void }) {
  const [cart, setCart] = useState<Product[]>([products[1]]);
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="storefront">
      <header className="storefront-header">
        <div className="brand-row storefront-brand">
          <div className="brand-mark"><Store size={21} /></div>
          <div>
            <strong>Jonathan Balucanag</strong>
            <span>Plya Med Storefront</span>
          </div>
        </div>
        <nav>
          <a href="#products">Products</a>
          <a href="#clinic">Clinic QR</a>
          <a href="#apply">Recruit</a>
          <button className="secondary-button" onClick={() => onWorkspace("admin")}>Portal Demo</button>
        </nav>
      </header>
      <section className="store-hero">
        <div>
          <StatusBadge tone="info">Rep-attributed storefront</StatusBadge>
          <h1>Cash-pay peptide strip ordering with clear attribution.</h1>
          <p>
            Browse oral peptide strips, checkout through Jonathan's branded page, and keep the order tied to the correct rep, clinic, provider, and commission ledger.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#products">Shop Products</a>
            <a className="secondary-button" href="#apply">Apply as Rep</a>
          </div>
        </div>
        <div className="store-visual">
          <div className="strip-box">
            <Sparkles size={34} />
            <strong>Peptide Strips</strong>
            <span>5 days on · 2 days off</span>
          </div>
          <div className="qr-card">
            <QrCode size={58} />
            <span>Clinic QR route</span>
          </div>
        </div>
      </section>
      <section className="store-grid" id="products">
        <div className="product-catalog">
          <h2>Product Catalog</h2>
          <div className="public-products">
            {products.slice(0, 5).map((product) => (
              <article className="public-product" key={product.code}>
                <div>
                  <span>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.benefit}</p>
                  <small>{product.frequency}</small>
                </div>
                <strong>${product.price}</strong>
                <button
                  className="outline-chip"
                  onClick={() => setCart((current) => [...current, product])}
                >
                  <Plus size={16} /> Add
                </button>
              </article>
            ))}
          </div>
        </div>
        <aside className="public-cart">
          <h2>Cart</h2>
          {cart.map((product, index) => (
            <div className="cart-item" key={`${product.code}-${index}`}>
              <span>{product.name}</span>
              <strong>${product.price}</strong>
            </div>
          ))}
          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="primary-button full-width">Checkout</button>
          <p>Attribution: REP_STOREFRONT · Jonathan Balucanag</p>
        </aside>
      </section>
      <section className="store-panels">
        <Panel title="Clinic QR landing" icon={QrCode}>
          <p>Patients scan a clinic-specific QR code, purchase products, and the backend records clinic, provider, rep, and distributor attribution.</p>
        </Panel>
        <Panel title="Recruitment link" icon={Users}>
          <p>New applicants are associated with the referring rep for affiliate override tracking and onboarding follow-up.</p>
        </Panel>
      </section>
    </div>
  );
}

function LearningPage() {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Learning center"
        title="Product certification and compliance training"
        description="Training videos, presentations, compliance documents, and quiz attempts are tracked for reps and providers."
        actions={<button className="secondary-button"><BookOpenCheck size={17} /> My Learning</button>}
      />
      <div className="tabs">
        {["All", "Onboarding", "Product Education", "System How-Tos", "Sales Process", "Compliance"].map((tab, index) => (
          <button className={index === 0 ? "active" : ""} key={tab}>{tab}</button>
        ))}
      </div>
      <div className="learning-grid">
        <article className="learning-card">
          <div className="learning-icon"><ClipboardCheck size={24} /></div>
          <StatusBadge tone="success">Passed</StatusBadge>
          <span>Certification</span>
          <h3>Peptide Strips Certification</h3>
          <p>A 32-question certification covering peptide science, product knowledge, protocols, pricing, and oral strip positioning.</p>
          <small>32 questions · 80% to pass · Best: 91%</small>
          <button className="link-button">Retake <ArrowRight size={15} /></button>
        </article>
        <article className="learning-card">
          <div className="learning-icon"><ShieldCheck size={24} /></div>
          <StatusBadge tone="warning">Required</StatusBadge>
          <span>Compliance</span>
          <h3>Cash-pay ordering and claims boundaries</h3>
          <p>Explains cash-pay product flow, no-insurance positioning, defect handling, and approved language.</p>
          <small>18 minutes · Quiz included</small>
          <button className="link-button">Start <ArrowRight size={15} /></button>
        </article>
      </div>
    </section>
  );
}

function MessagesPage() {
  return (
    <section className="messages-layout">
      <aside className="channel-list">
        <div className="messages-title">
          <h1>Messages</h1>
          <button className="icon-button"><Plus size={18} /></button>
        </div>
        <span className="section-label">Channels</span>
        {["announcements", "company", "system-requests"].map((channel, index) => (
          <button className={`channel ${index === 2 ? "active" : ""}`} key={channel}>
            <Hash size={17} /> {channel}
          </button>
        ))}
      </aside>
      <div className="message-thread">
        <header>
          <h2># system-requests</h2>
          <span>Report platform issues or request improvements here.</span>
        </header>
        <div className="empty-thread">
          <MessageSquare size={34} />
          <p>No messages yet. Say hi.</p>
        </div>
        <div className="composer">
          <button className="icon-button"><Link size={18} /></button>
          <input placeholder="Message..." />
          <button className="primary-icon"><Send size={18} /></button>
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Downline hierarchy"
        title="Team Members"
        description="Track direct reports, team production, affiliate overrides, and onboarding state."
      />
      <div className="team-map">
        <div className="person-node root">Jonathan Balucanag<span>Sales Rep</span></div>
        <div className="person-node">Joshua Tan<span>Upline · COO</span></div>
        <div className="person-node muted">No direct reports yet<span>Recruit reps to build your team</span></div>
      </div>
    </section>
  );
}

function ProspectsPage() {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Built-in CRM"
        title="Prospects"
        description="Manage clinics, providers, customers, and rep candidates from first contact through conversion."
        actions={<button className="primary-button"><Plus size={17} /> Add Prospect</button>}
      />
      <ResponsiveTable
        columns={["Name", "Type", "Status", "Next Follow-up", "Owner"]}
        rows={[
          ["Mesa Regenerative Clinic", "Clinic", <StatusBadge tone="info">Interested</StatusBadge>, "May 22, 2026", "Jonathan"],
          ["Nora Wallace", "Rep Candidate", <StatusBadge tone="warning">Screening</StatusBadge>, "May 20, 2026", "Joshua Tan"],
          ["Peak Recovery Gym", "Customer Group", <StatusBadge tone="success">Converted</StatusBadge>, "None", "Jonathan"],
        ]}
        mobileTitleIndex={0}
      />
    </section>
  );
}

function AuditPage() {
  return (
    <section className="page-stack">
      <PageHeader
        eyebrow="Supportability"
        title="Audit Logs"
        description="Every impersonation, price change, order action, and commission event should be traceable."
      />
      <Panel title="Recent audit trail" icon={FileCheck2}>
        <ActivityList />
      </Panel>
    </section>
  );
}

function CreateOrderModal({ onClose }: { onClose: () => void }) {
  const [cart, setCart] = useState<Product[]>([]);
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="modal-layer" role="dialog" aria-modal="true">
      <div className="order-modal">
        <header className="modal-header">
          <div>
            <h2>New order for clinic</h2>
            <p>Browse products by category. Payment, prescription, and shipping flow depend on what is in the cart.</p>
          </div>
          <button className="icon-button" onClick={onClose}><X size={22} /></button>
        </header>
        <div className="modal-form">
          <LabelInput label="Customer / organization" value="" placeholder="Search organizations..." wide />
          <label className="checkbox-row">
            <input type="checkbox" />
            Skip approval - auto-approve and route straight to fulfillment
          </label>
        </div>
        <div className="modal-body-grid">
          <aside className="category-menu">
            <span>Categories</span>
            {["All 39", "Skin Grafts 23", "Peptides 16", "Injectables 6", "Rx Required 4"].map((item, index) => (
              <button className={index === 2 ? "active" : ""} key={item}>{item}</button>
            ))}
          </aside>
          <div>
            <SearchFilterBar placeholder="Search products..." compact />
            <div className="product-list modal-products">
              {products.map((product) => (
                <button
                  className="product-row"
                  key={product.code}
                  onClick={() => setCart((current) => [...current, product])}
                >
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.code} {product.requiresRx ? "· Rx required" : ""}</small>
                  </span>
                  <span>${product.price.toFixed(2)} <Plus size={16} /></span>
                </button>
              ))}
            </div>
          </div>
          <aside className="cart-pane">
            <h3>Cart ({cart.length})</h3>
            {cart.length === 0 ? (
              <p>Empty</p>
            ) : (
              cart.map((product, index) => (
                <div className="cart-item" key={`${product.code}-${index}`}>
                  <span>{product.name}</span>
                  <strong>${product.price}</strong>
                </div>
              ))
            )}
            <div className="cart-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
        <footer className="modal-footer">
          <button className="ghost-action" onClick={onClose}>Cancel</button>
          <button className="primary-button" disabled={cart.length === 0}>
            {cart.length === 0 ? "Add a product first" : "Create payment link"} <ArrowRight size={17} />
          </button>
        </footer>
      </div>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="header-actions">{actions}</div>}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: StatusTone;
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}><Icon size={22} /></div>
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  );
}

function HeroMetric({
  title,
  value,
  cta,
  icon: Icon,
}: {
  title: string;
  value: string;
  cta: string;
  icon: LucideIcon;
}) {
  return (
    <article className="hero-metric">
      <div>
        <strong>{value}</strong>
        <span>{title}</span>
      </div>
      <Icon size={42} />
      <button>{cta} <ArrowRight size={15} /></button>
    </article>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="panel">
      <div className="panel-title">
        <Icon size={19} />
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ActivityList() {
  return (
    <div className="activity-list">
      {orders.map((order) => (
        <div className="activity-item" key={order.id}>
          <div className="metric-icon success"><ShoppingCart size={18} /></div>
          <div>
            <strong>{order.customer}</strong>
            <span>{order.id} - {order.organization}</span>
            <small>{order.date} · {order.attribution}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressMetric({
  label,
  value,
  percent,
  danger,
}: {
  label: string;
  value: string;
  percent: number;
  danger?: boolean;
}) {
  return (
    <div className="progress-row">
      <div>
        <span>{label}</span>
        <strong className={danger ? "danger-text" : ""}>{value}</strong>
      </div>
      <div className="progress-track">
        <span style={{ width: `${percent}%` }} className={danger ? "danger" : ""} />
      </div>
    </div>
  );
}

function SearchFilterBar({ placeholder, compact }: { placeholder: string; compact?: boolean }) {
  return (
    <div className={`search-filter ${compact ? "compact" : ""}`}>
      <Search size={18} />
      <input placeholder={placeholder} />
      {!compact && (
        <button>
          All Statuses <ChevronDown size={16} />
        </button>
      )}
    </div>
  );
}

function ResponsiveTable({
  columns,
  rows,
  mobileTitleIndex,
}: {
  columns: string[];
  rows: React.ReactNode[][];
  mobileTitleIndex: number;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, index) => <td key={index}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mobile-records">
        {rows.map((row, rowIndex) => (
          <article className="mobile-record" key={rowIndex}>
            <div className="mobile-record-title">{row[mobileTitleIndex]}</div>
            {row.map((cell, index) => (
              index !== mobileTitleIndex && (
                <div className="mobile-record-line" key={index}>
                  <span>{columns[index]}</span>
                  <strong>{cell}</strong>
                </div>
              )
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}

function RecordTitle({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="record-title">
      {Icon && <Icon size={18} />}
      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </div>
  );
}

function StatusBadge({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}

function LabelInput({
  label,
  value,
  helper,
  placeholder,
  wide,
}: {
  label: string;
  value: string;
  helper?: string;
  placeholder?: string;
  wide?: boolean;
}) {
  return (
    <label className={wide ? "wide" : ""}>
      <span>{label}</span>
      <input defaultValue={value} placeholder={placeholder} />
      {helper && <small>{helper}</small>}
    </label>
  );
}

function UrlRow({ label, url }: { label: string; url: string }) {
  return (
    <div className="url-row">
      <div>
        <span>{label}</span>
        <strong>{url}</strong>
      </div>
      <button className="secondary-button"><Copy size={16} /> Copy</button>
      <button className="secondary-button"><Globe size={16} /> Open</button>
    </div>
  );
}

function AgreementRow({ title }: { title: string }) {
  return (
    <div className="ledger-card">
      <div>
        <strong>{title}</strong>
        <span>Current version: 2026-05 · Signed 5/16/2026 by Jonathan Balucanag</span>
      </div>
      <StatusBadge tone="success">Signed</StatusBadge>
    </div>
  );
}

function PatientCard() {
  return (
    <article className="patient-card">
      <div className="patient-line" />
      <div>
        <strong>Andrew Sinichar</strong>
        <span>MRN: ADV-20260422-0001 · 35y</span>
        <StatusBadge tone="success">In Progress</StatusBadge>
        <small>6:00 PM · Peptide consult</small>
      </div>
      <button className="primary-button">View</button>
      <button className="secondary-button">Complete</button>
    </article>
  );
}

function ScheduleView() {
  return (
    <div className="schedule">
      {["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"].map((hour) => (
        <div className="schedule-row" key={hour}>
          <span>{hour}</span>
          {hour === "6 PM" && (
            <div className="schedule-event">
              <strong>andrew Sinichar</strong>
              <small>6:00 PM · 15m · In-Progress</small>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MobileNav({
  items,
  activePage,
  onNavigate,
}: {
  items: NavItem[];
  activePage: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav className="mobile-nav">
      {items.map((item) => (
        <button
          className={activePage === item.id ? "active" : ""}
          key={item.id}
          onClick={() => onNavigate(item.id)}
        >
          <item.icon size={19} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default App;
