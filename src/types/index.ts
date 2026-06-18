export interface Part {
  id: number;
  name: string;
  sku: string | null;
  qty: number;
  minQty: number;
  unit: string;
  category: string | null;
}

export interface Vehicle {
  id: number;
  plate: string;
  brand: string | null;
  model: string | null;
  year: number | null;
  notes: string | null;
  stnkExpiry: string | null;
  kirExpiry: string | null;
  stnkPath: string | null;
  kirPath: string | null;
}

export interface Supplier {
  id: number;
  name: string;
  contact: string | null;
  address: string | null;
}

export interface Client {
  id: number;
  name: string;
  contact: string | null;
  address: string | null;
}

export interface Invoice {
  id: number;
  clientId: number;
  clientName?: string;
  total: number;
  paid: number;
  status: string;
  dueDate: string | null;
  attachedDeliveryOrders: number;
  createdAt: string;
  items?: InvoiceItem[];
  archived?: number;
  archivedAt?: string | null;
}

export interface InvoiceItem {
  id: number;
  invoiceId: number;
  description: string;
  qty: number;
  price: number;
}

export interface Payment {
  id: number;
  invoiceId: number;
  amount: number;
  date: string;
  method: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  dueDate: string | null;
  createdAt: string;
}

export interface StockTransaction {
  id: number;
  partId: number;
  qty: number;
  type: string;
  reason: string | null;
  adminId: number | null;
  createdAt: string;
  partName: string | null;
  supplierId: number | null;
  supplierName: string | null;
}

export interface Employee {
  id: number;
  name: string;
  phone: string | null;
  employeeType: string;
  specialization: string | null;
  hireDate: string | null;
  salary: number;
  username: string | null;
  licenseNumber: string | null;
  vehicleId: number | null;
  ktpPath: string | null;
  simPath: string | null;
  createdAt: string;
}

export interface CashAdvance {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeType: string;
  amount: number;
  paidAmount: number;
  remaining: number;
  disbursedAmount: number;
  requestDate: string;
  approvalStatus: string;
  approvedBy: number | null;
  approvalDate: string | null;
  notes: string | null;
  createdAt: string;
  approverName?: string;
  archived?: number;
  archivedAt?: string | null;
}

export interface CashAdvanceRepayment {
  id: number;
  cashAdvanceId: number;
  amount: number;
  date: string;
  notes: string | null;
  source: string | null;
  travelMoneyId: number | null;
  salaryId: number | null;
  createdAt: string;
}

export interface Salary {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeType: string;
  amount: number;
  paidAmount: number;
  remaining: number;
  period: string | null;
  status: string;
  paymentDate: string | null;
  notes: string | null;
  createdAt: string;
  archived?: number;
  archivedAt?: string | null;
}

export interface Repair {
  id: number;
  vehicleId: number;
  mechanicId: number | null;
  description: string;
  damageReport: string | null;
  actionsTaken: string | null;
  startDate: string | null;
  endDate: string | null;
  status: string;
  totalCost: number;
  createdAt: string;
  archived?: number;
  archivedAt?: string | null;
}

export interface RepairPart {
  id: number;
  repairId: number;
  partId: number;
  qty: number;
  price: number;
}

export interface AuditLog {
  id: number;
  adminId: number | null;
  action: string;
  entityType: string;
  entityId: number | null;
  description: string | null;
  createdAt: string;
}

export interface StockTrend {
  month: string;
  stockIn: number;
  stockOut: number;
}

export interface EnhancedDashboardStats {
  totalParts: number;
  totalVehicles: number;
  unpaidInvoices: number;
  lowStockParts: number;
  totalMechanics: number;
  totalDrivers: number;
  activeRepairs: number;
  pendingKasbon: number;
  totalAdmins: number;
  recentActivities: AuditLog[];
  stockTrend: StockTrend[];
}

export interface PurchaseOrder {
  id: number;
  supplierId: number;
  orderDate: string;
  expectedDate: string | null;
  status: string;
  notes: string | null;
  adminId: number | null;
  createdAt: string;
  approvalStatus: string;
  approvedBy: number | null;
  approvalDate: string | null;
  archived?: number;
  archivedAt?: string | null;
  storeName?: string | null;
  transferProofPath?: string | null;
  itemName?: string | null;
  totalQty?: number | null;
}

export interface PurchaseOrderItem {
  id: number;
  poId: number;
  partId: number;
  itemName?: string;
  qty: number;
  price: number;
}

export interface Reminder {
  id: number;
  title: string;
  description: string | null;
  remindAt: string;
  remindType: string;
  relatedEntity: string | null;
  relatedId: number | null;
  done: boolean;
  createdAt: string;
}

export interface AdminInfo {
  id: number;
  username: string;
  role: string;
}

export interface Approval {
  id: number;
  entityType: string;
  entityId: number;
  requesterName: string | null;
  approverName: string | null;
  status: string;
  requestDate: string;
  approvalDate: string | null;
  notes: string | null;
  description: string;
}

export interface ExpenseRequest {
  id: number;
  title: string;
  description: string | null;
  amount: number;
  paidAmount: number;
  remaining: number;
  expenseType: string;
  status: string;
  requesterId: number | null;
  requesterName: string | null;
  requestDate: string;
  approvalDate: string | null;
  approvedBy: number | null;
  notes: string | null;
  createdAt: string;
  archived?: number;
  archivedAt?: string | null;
}

export interface ExpensePayment {
  id: number;
  expenseId: number;
  amount: number;
  paymentDate: string;
  notes: string | null;
  createdAt: string;
}

export interface TravelPermit {
  id: number;
  driverId: number;
  driverName: string;
  vehicleId: number | null;
  vehiclePlate: string | null;
  destination: string;
  purpose: string | null;
  startDate: string;
  endDate: string;
  status: string;
  approvedBy: number | null;
  approvalDate: string | null;
  notes: string | null;
  createdAt: string;
  archived?: number;
  archivedAt?: string | null;
}

export interface TravelMoney {
  id: number;
  travelPermitId: number | null;
  driverId: number;
  driverName: string;
  totalAmount: number;
  paidAmount: number;
  kasbonDeduction: number;
  remaining: number;
  installmentCount: number;
  description: string | null;
  status: string;
  requestDate: string;
  approvalStatus: string;
  approvedBy: number | null;
  approvalDate: string | null;
  createdAt: string;
  cashAdvanceId: number | null;
  archived?: number;
  archivedAt?: string | null;
}

export interface ProofOfDelivery {
  id: number;
  clientId: number;
  clientName: string;
  invoiceId: number | null;
  invoiceNumber: string | null;
  driverName: string | null;
  totalOrders: number;
  status: string;
  notes: string | null;
  createdAt: string;
  receivedAt: string | null;
  archived?: number;
  archivedAt?: string | null;
}

export interface InventoryReport {
  totalParts: number;
  totalStockIn: number;
  totalStockOut: number;
  lowStockParts: Part[];
  recentTransactions: StockTransaction[];
  totalExpenses: number;
}

export interface MechanicStat {
  mechanicId: number;
  mechanicName: string;
  repairCount: number;
  totalCost: number;
}

export interface MechanicReport {
  totalRepairs: number;
  completedRepairs: number;
  totalCost: number;
  mechanics: MechanicStat[];
}

export interface CashAdvanceReport {
  totalIssued: number;
  totalRepaid: number;
  outstanding: number;
  advances: CashAdvanceWithDriver[];
}

export interface CashAdvanceWithDriver {
  id: number;
  driverName: string;
  amount: number;
  repaid: number;
  outstanding: number;
  requestDate: string;
  approvalStatus: string;
}

export interface FinancialReport {
  totalInventoryExpense: number;
  totalRepairExpense: number;
  totalKasbon: number;
  totalOperational: number;
  monthlyBreakdown: MonthlyExpense[];
}

export interface MonthlyExpense {
  month: string;
  inventory: number;
  repairs: number;
  kasbon: number;
}

export interface OwnerDashboardStats {
  totalExpensesThisMonth: number;
  totalExpensesThisYear: number;
  topVehicleCosts: TopVehicleCost[];
  topSpareParts: TopSparePart[];
  totalActiveCashAdvances: number;
  totalOutstandingKasbon: number;
  criticalInventoryItems: number;
  upcomingStnk: VehicleExpiry[];
  upcomingKir: VehicleExpiry[];
  recentRepairs: RepairSummary[];
  recentInventoryMovements: number;
  recentPaymentsTotal: number;
}

export interface TopVehicleCost {
  vehicleId: number;
  plate: string;
  totalRepairCost: number;
  totalCost: number;
}

export interface TopSparePart {
  partId: number;
  partName: string;
  usageCount: number;
}

export interface VehicleExpiry {
  vehicleId: number;
  plate: string;
  expiryDate: string | null;
  expiryType: string;
}

export interface RepairSummary {
  id: number;
  vehicleId: number;
  plate: string;
  description: string;
  status: string;
  totalCost: number;
  createdAt: string;
}

export interface VehicleCostReport {
  vehicleId: number;
  plate: string;
  totalRepairCost: number;
  totalCost: number;
}

export interface SupplierStat {
  supplierId: number;
  supplierName: string;
  orderCount: number;
  totalSpent: number;
}

export interface SupplierReport {
  totalOrders: number;
  totalSpent: number;
  pendingOrders: number;
  supplierStats: SupplierStat[];
}

export interface SupplierInvoiceAttachment {
  id: number;
  invoiceNumber: string;
  supplierId: number;
  supplierName: string;
  invoiceDate: string | null;
  totalAmount: number;
  paidAmount: number;
  fileName: string | null;
  storedPath: string | null;
  fileType: string | null;
  fileSize: number | null;
  poId: number | null;
  expenseId: number | null;
  stockTransactionId: number | null;
  uploadedBy: number | null;
  uploaderName: string | null;
  uploadDate: string;
  isActive: boolean;
  replacedBy: number | null;
  archived?: number;
  archivedAt?: string | null;
}

export interface InvoiceComplianceReport {
  totalAttached: number;
  totalMissing: number;
  compliancePct: number;
  bySupplier: SupplierInvoiceStat[];
}

export interface SupplierInvoiceStat {
  supplierId: number;
  supplierName: string;
  totalPos: number;
  withInvoice: number;
  withoutInvoice: number;
}

export interface SupplierPayment {
  id: number;
  invoiceId: number;
  amount: number;
  method: string;
  paymentDate: string;
  proofPath: string | null;
  notes: string | null;
  createdAt: string;
}

export interface PodPhoto {
  id: number;
  podId: number;
  fileName: string;
  uploadDate: string;
}

export interface MechanicKasbonBalance {
  employeeId: number;
  employeeName: string;
  phone: string | null;
  totalKasbon: number;
  totalRepaid: number;
  outstandingBalance: number;
}
