import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertCustomerSchema,
  insertServiceSchema,
  insertStaffSchema,
  insertBookingSchema,
  insertPurchaseRecordSchema,
  insertMarketingCampaignSchema,
  insertSeoSettingSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Customers
  app.get("/api/customers", async (_req, res) => {
    const customers = await storage.getAllCustomers();
    res.json(customers);
  });

  app.get("/api/customers/:id", async (req, res) => {
    const customer = await storage.getCustomer(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  });

  app.post("/api/customers", async (req, res) => {
    try {
      const data = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(data);
      res.json(customer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/customers/:id", async (req, res) => {
    try {
      const customer = await storage.updateCustomer(req.params.id, req.body);
      if (!customer) return res.status(404).json({ error: "Customer not found" });
      res.json(customer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/customers/:id", async (req, res) => {
    const success = await storage.deleteCustomer(req.params.id);
    if (!success) return res.status(404).json({ error: "Customer not found" });
    res.json({ success: true });
  });

  // Services
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getAllServices();
    res.json(services);
  });

  app.get("/api/services/active", async (_req, res) => {
    const services = await storage.getActiveServices();
    res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(req.params.id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  });

  app.post("/api/services", async (req, res) => {
    try {
      const data = insertServiceSchema.parse(req.body);
      const service = await storage.createService(data);
      res.json(service);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/services/:id", async (req, res) => {
    const success = await storage.deleteService(req.params.id);
    if (!success) return res.status(404).json({ error: "Service not found" });
    res.json({ success: true });
  });

  // Staff
  app.get("/api/staff", async (_req, res) => {
    const staff = await storage.getAllStaff();
    res.json(staff);
  });

  app.get("/api/staff/active", async (_req, res) => {
    const staff = await storage.getActiveStaff();
    res.json(staff);
  });

  app.get("/api/staff/role/:role", async (req, res) => {
    const staff = await storage.getStaffByRole(req.params.role);
    res.json(staff);
  });

  app.get("/api/staff/:id", async (req, res) => {
    const member = await storage.getStaff(req.params.id);
    if (!member) return res.status(404).json({ error: "Staff member not found" });
    res.json(member);
  });

  app.post("/api/staff", async (req, res) => {
    try {
      const data = insertStaffSchema.parse(req.body);
      const member = await storage.createStaff(data);
      res.json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/staff/:id", async (req, res) => {
    try {
      const member = await storage.updateStaff(req.params.id, req.body);
      if (!member) return res.status(404).json({ error: "Staff member not found" });
      res.json(member);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/staff/:id", async (req, res) => {
    const success = await storage.deleteStaff(req.params.id);
    if (!success) return res.status(404).json({ error: "Staff member not found" });
    res.json({ success: true });
  });

  // Bookings
  app.get("/api/bookings", async (_req, res) => {
    const bookings = await storage.getAllBookings();
    res.json(bookings);
  });

  app.get("/api/bookings/date/:date", async (req, res) => {
    const bookings = await storage.getBookingsByDate(req.params.date);
    res.json(bookings);
  });

  app.get("/api/bookings/customer/:customerId", async (req, res) => {
    const bookings = await storage.getBookingsByCustomer(req.params.customerId);
    res.json(bookings);
  });

  app.get("/api/bookings/:id", async (req, res) => {
    const booking = await storage.getBooking(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const data = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(data);
      
      let customerId = booking.customerId;
      if (!customerId && booking.customerPhone) {
        let customer = await storage.getCustomerByPhone(booking.customerPhone);
        if (!customer) {
          customer = await storage.createCustomer({
            name: booking.customerName,
            phone: booking.customerPhone,
            lineId: booking.customerLineId || null,
            email: null,
            notes: null
          });
        }
        customerId = customer.id;
        await storage.updateBooking(booking.id, { customerId });
      }
      
      res.json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.updateBooking(req.params.id, req.body);
      if (!booking) return res.status(404).json({ error: "Booking not found" });
      res.json(booking);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    const success = await storage.deleteBooking(req.params.id);
    if (!success) return res.status(404).json({ error: "Booking not found" });
    res.json({ success: true });
  });

  // Purchase Records
  app.get("/api/purchase-records/customer/:customerId", async (req, res) => {
    const records = await storage.getPurchaseRecordsByCustomer(req.params.customerId);
    res.json(records);
  });

  app.post("/api/purchase-records", async (req, res) => {
    try {
      const data = insertPurchaseRecordSchema.parse(req.body);
      const record = await storage.createPurchaseRecord(data);
      res.json(record);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Marketing Campaigns
  app.get("/api/marketing-campaigns", async (_req, res) => {
    const campaigns = await storage.getAllMarketingCampaigns();
    res.json(campaigns);
  });

  app.get("/api/marketing-campaigns/active", async (_req, res) => {
    const campaigns = await storage.getActiveMarketingCampaigns();
    res.json(campaigns);
  });

  app.get("/api/marketing-campaigns/:id", async (req, res) => {
    const campaign = await storage.getMarketingCampaign(req.params.id);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });
    res.json(campaign);
  });

  app.post("/api/marketing-campaigns", async (req, res) => {
    try {
      const data = insertMarketingCampaignSchema.parse(req.body);
      const campaign = await storage.createMarketingCampaign(data);
      res.json(campaign);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/marketing-campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.updateMarketingCampaign(req.params.id, req.body);
      if (!campaign) return res.status(404).json({ error: "Campaign not found" });
      res.json(campaign);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/marketing-campaigns/:id", async (req, res) => {
    const success = await storage.deleteMarketingCampaign(req.params.id);
    if (!success) return res.status(404).json({ error: "Campaign not found" });
    res.json({ success: true });
  });

  // Auth & User Management
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "帳號或密碼錯誤" });
      }
      
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/auth/change-password", async (req, res) => {
    try {
      const { username, oldPassword, newPassword } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== oldPassword) {
        return res.status(401).json({ error: "當前密碼錯誤" });
      }
      
      const updated = await storage.updateUserPassword(user.id, newPassword);
      if (!updated) return res.status(404).json({ error: "更新失敗" });
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // SEO Settings
  app.get("/api/seo-settings", async (_req, res) => {
    const settings = await storage.getAllSeoSettings();
    res.json(settings);
  });

  app.get("/api/seo-settings/:page", async (req, res) => {
    const setting = await storage.getSeoSettingByPage(req.params.page);
    if (!setting) return res.status(404).json({ error: "SEO setting not found" });
    res.json(setting);
  });

  app.post("/api/seo-settings", async (req, res) => {
    try {
      const data = insertSeoSettingSchema.parse(req.body);
      const setting = await storage.createOrUpdateSeoSetting(data);
      res.json(setting);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
