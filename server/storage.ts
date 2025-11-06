import {
  type User, type InsertUser,
  type Customer, type InsertCustomer,
  type Service, type InsertService,
  type Staff, type InsertStaff,
  type Booking, type InsertBooking,
  type PurchaseRecord, type InsertPurchaseRecord,
  type MarketingCampaign, type InsertMarketingCampaign,
  type SeoSetting, type InsertSeoSetting
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPassword(id: string, newPassword: string): Promise<User | undefined>;
  
  getAllCustomers(): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  getCustomerByPhone(phone: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: string, customer: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: string): Promise<boolean>;
  
  getAllServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;
  
  getAllStaff(): Promise<Staff[]>;
  getActiveStaff(): Promise<Staff[]>;
  getStaffByRole(role: string): Promise<Staff[]>;
  getStaff(id: string): Promise<Staff | undefined>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: string, staff: Partial<InsertStaff>): Promise<Staff | undefined>;
  deleteStaff(id: string): Promise<boolean>;
  
  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByDate(date: string): Promise<Booking[]>;
  getBookingsByCustomer(customerId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  deleteBooking(id: string): Promise<boolean>;
  
  getPurchaseRecordsByCustomer(customerId: string): Promise<PurchaseRecord[]>;
  createPurchaseRecord(record: InsertPurchaseRecord): Promise<PurchaseRecord>;
  
  getAllMarketingCampaigns(): Promise<MarketingCampaign[]>;
  getActiveMarketingCampaigns(): Promise<MarketingCampaign[]>;
  getMarketingCampaign(id: string): Promise<MarketingCampaign | undefined>;
  createMarketingCampaign(campaign: InsertMarketingCampaign): Promise<MarketingCampaign>;
  updateMarketingCampaign(id: string, campaign: Partial<InsertMarketingCampaign>): Promise<MarketingCampaign | undefined>;
  deleteMarketingCampaign(id: string): Promise<boolean>;
  
  getAllSeoSettings(): Promise<SeoSetting[]>;
  getSeoSettingByPage(page: string): Promise<SeoSetting | undefined>;
  createOrUpdateSeoSetting(setting: InsertSeoSetting): Promise<SeoSetting>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private customers: Map<string, Customer>;
  private services: Map<string, Service>;
  private staff: Map<string, Staff>;
  private bookings: Map<string, Booking>;
  private purchaseRecords: Map<string, PurchaseRecord>;
  private marketingCampaigns: Map<string, MarketingCampaign>;
  private seoSettings: Map<string, SeoSetting>;

  constructor() {
    this.users = new Map();
    this.customers = new Map();
    this.services = new Map();
    this.staff = new Map();
    this.bookings = new Map();
    this.purchaseRecords = new Map();
    this.marketingCampaigns = new Map();
    this.seoSettings = new Map();
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    const defaultAdminUser: InsertUser = {
      username: "yama3058",
      password: "yama3058"
    };
    const adminId = randomUUID();
    this.users.set(adminId, { ...defaultAdminUser, id: adminId });

    const defaultServices: InsertService[] = [
      { name: "洗髮", description: "舒適的洗髮體驗", price: 250, priceNote: null, duration: 30, isActive: true },
      { name: "專業剪髮", description: "根據臉型設計專屬髮型", price: 400, priceNote: null, duration: 60, isActive: true },
      { name: "時尚染髮", description: "使用頂級染劑", price: 2000, priceNote: "起", duration: 120, isActive: true },
      { name: "質感燙髮", description: "自然捲度與蓬鬆感", price: 2000, priceNote: "起", duration: 150, isActive: true },
      { name: "深層護髮", description: "深層修護受損髮質", price: 800, priceNote: "起", duration: 45, isActive: true },
    ];

    defaultServices.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { ...service, id, createdAt: new Date() });
    });

    const defaultStaff: InsertStaff[] = [
      { 
        name: "益安", 
        role: "設計師",
        email: null,
        phone: null,
        specialty: "資深設計師（總監）", 
        yearsOfExperience: 35,
        photoUrl: null,
        isActive: true 
      },
      { 
        name: "巧宣", 
        role: "設計師",
        email: null,
        phone: null,
        specialty: "資深設計師", 
        yearsOfExperience: 27,
        photoUrl: null,
        isActive: true 
      },
    ];

    defaultStaff.forEach(member => {
      const id = randomUUID();
      this.staff.set(id, { ...member, id, createdAt: new Date() });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUserPassword(id: string, newPassword: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, password: newPassword };
    this.users.set(id, updated);
    return updated;
  }

  async getAllCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async getCustomerByPhone(phone: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(c => c.phone === phone);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = randomUUID();
    const customer: Customer = { ...insertCustomer, id, createdAt: new Date() };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id: string, updates: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;
    const updated = { ...customer, ...updates };
    this.customers.set(id, updated);
    return updated;
  }

  async deleteCustomer(id: string): Promise<boolean> {
    return this.customers.delete(id);
  }

  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getActiveServices(): Promise<Service[]> {
    return Array.from(this.services.values())
      .filter(s => s.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { ...insertService, id, createdAt: new Date() };
    this.services.set(id, service);
    return service;
  }

  async updateService(id: string, updates: Partial<InsertService>): Promise<Service | undefined> {
    const service = this.services.get(id);
    if (!service) return undefined;
    const updated = { ...service, ...updates };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getActiveStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values())
      .filter(s => s.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStaffByRole(role: string): Promise<Staff[]> {
    return Array.from(this.staff.values())
      .filter(s => s.role === role && s.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getStaff(id: string): Promise<Staff | undefined> {
    return this.staff.get(id);
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const id = randomUUID();
    const member: Staff = { ...insertStaff, id, createdAt: new Date() };
    this.staff.set(id, member);
    return member;
  }

  async updateStaff(id: string, updates: Partial<InsertStaff>): Promise<Staff | undefined> {
    const member = this.staff.get(id);
    if (!member) return undefined;
    const updated = { ...member, ...updates };
    this.staff.set(id, updated);
    return updated;
  }

  async deleteStaff(id: string): Promise<boolean> {
    return this.staff.delete(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByDate(date: string): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(b => b.bookingDate === date)
      .sort((a, b) => a.bookingTime.localeCompare(b.bookingTime));
  }

  async getBookingsByCustomer(customerId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values())
      .filter(b => b.customerId === customerId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { ...insertBooking, id, createdAt: new Date() };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    const updated = { ...booking, ...updates };
    this.bookings.set(id, updated);
    return updated;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }

  async getPurchaseRecordsByCustomer(customerId: string): Promise<PurchaseRecord[]> {
    return Array.from(this.purchaseRecords.values())
      .filter(r => r.customerId === customerId)
      .sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime());
  }

  async createPurchaseRecord(insertRecord: InsertPurchaseRecord): Promise<PurchaseRecord> {
    const id = randomUUID();
    const record: PurchaseRecord = { ...insertRecord, id, purchaseDate: new Date() };
    this.purchaseRecords.set(id, record);
    return record;
  }

  async getAllMarketingCampaigns(): Promise<MarketingCampaign[]> {
    return Array.from(this.marketingCampaigns.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getActiveMarketingCampaigns(): Promise<MarketingCampaign[]> {
    return Array.from(this.marketingCampaigns.values())
      .filter(c => c.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getMarketingCampaign(id: string): Promise<MarketingCampaign | undefined> {
    return this.marketingCampaigns.get(id);
  }

  async createMarketingCampaign(insertCampaign: InsertMarketingCampaign): Promise<MarketingCampaign> {
    const id = randomUUID();
    const campaign: MarketingCampaign = { ...insertCampaign, id, createdAt: new Date() };
    this.marketingCampaigns.set(id, campaign);
    return campaign;
  }

  async updateMarketingCampaign(id: string, updates: Partial<InsertMarketingCampaign>): Promise<MarketingCampaign | undefined> {
    const campaign = this.marketingCampaigns.get(id);
    if (!campaign) return undefined;
    const updated = { ...campaign, ...updates };
    this.marketingCampaigns.set(id, updated);
    return updated;
  }

  async deleteMarketingCampaign(id: string): Promise<boolean> {
    return this.marketingCampaigns.delete(id);
  }

  async getAllSeoSettings(): Promise<SeoSetting[]> {
    return Array.from(this.seoSettings.values());
  }

  async getSeoSettingByPage(page: string): Promise<SeoSetting | undefined> {
    return Array.from(this.seoSettings.values()).find(s => s.page === page);
  }

  async createOrUpdateSeoSetting(insertSetting: InsertSeoSetting): Promise<SeoSetting> {
    const existing = await this.getSeoSettingByPage(insertSetting.page);
    if (existing) {
      const updated = { ...existing, ...insertSetting, updatedAt: new Date() };
      this.seoSettings.set(existing.id, updated);
      return updated;
    }
    const id = randomUUID();
    const setting: SeoSetting = { ...insertSetting, id, updatedAt: new Date() };
    this.seoSettings.set(id, setting);
    return setting;
  }
}

export const storage = new MemStorage();
