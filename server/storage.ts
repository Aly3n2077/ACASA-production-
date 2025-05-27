import { users, services, contactInquiries, type User, type InsertUser, type Service, type InsertService, type ContactInquiry, type InsertContactInquiry } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  getContactInquiries(): Promise<ContactInquiry[]>;
  getContactInquiry(id: number): Promise<ContactInquiry | undefined>;
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  updateContactInquiryStatus(id: number, status: string): Promise<ContactInquiry | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private contactInquiries: Map<number, ContactInquiry>;
  private currentUserId: number;
  private currentServiceId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.contactInquiries = new Map();
    this.currentUserId = 1;
    this.currentServiceId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with default services
    this.initializeDefaultServices();
  }

  private initializeDefaultServices() {
    const defaultServices: InsertService[] = [
      {
        name: "AC Installation & Repair",
        description: "Complete air conditioning services including installation, repair, maintenance, and emergency fixes for all brands.",
        icon: "fas fa-snowflake",
        priceFrom: 800,
        duration: "2-4 hours typical",
        category: "cooling",
        whatsappMessage: "Hi, I need AC installation/repair service. Can you provide a quote?"
      },
      {
        name: "Refrigeration Services",
        description: "Expert repair for refrigerators, freezers, commercial cooling systems, and walk-in coolers.",
        icon: "fas fa-thermometer-half",
        priceFrom: 600,
        duration: "1-3 hours typical",
        category: "refrigeration",
        whatsappMessage: "Hi, I need refrigeration repair service. Can you help?"
      },
      {
        name: "Compressor Replacement",
        description: "Professional compressor replacement and repair for AC units, refrigerators, and commercial systems.",
        icon: "fas fa-cogs",
        priceFrom: 1500,
        duration: "4-6 hours typical",
        category: "compressor",
        whatsappMessage: "Hi, I need compressor replacement service. Can you provide a quote?"
      },
      {
        name: "Gas Refills (R134a, R410a)",
        description: "Professional refrigerant gas refills for all AC and refrigeration systems using quality R134a and R410a.",
        icon: "fas fa-wind",
        priceFrom: 400,
        duration: "1-2 hours typical",
        category: "gas",
        whatsappMessage: "Hi, I need gas refill service (R134a/R410a). Can you help?"
      },
      {
        name: "Government & Public Services",
        description: "Specialized HVAC services for government buildings, schools, hospitals, and public facilities.",
        icon: "fas fa-building",
        priceFrom: 0,
        duration: "Project-based",
        category: "government",
        whatsappMessage: "Hi, I need government/public facility HVAC service. Can we discuss requirements?"
      },
      {
        name: "24/7 Emergency Service",
        description: "Urgent repairs available 24/7 for critical cooling systems, commercial refrigeration, and emergency breakdowns.",
        icon: "fas fa-exclamation-triangle",
        priceFrom: 0,
        duration: "Available 24/7",
        category: "emergency",
        whatsappMessage: "Hi, I have an emergency appliance repair situation. Please help!"
      }
    ];

    defaultServices.forEach(service => {
      this.createService(service);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const service: Service = { ...insertService, id };
    this.services.set(id, service);
    return service;
  }

  async getContactInquiries(): Promise<ContactInquiry[]> {
    return Array.from(this.contactInquiries.values());
  }

  async getContactInquiry(id: number): Promise<ContactInquiry | undefined> {
    return this.contactInquiries.get(id);
  }

  async createContactInquiry(insertInquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const id = this.currentInquiryId++;
    const inquiry: ContactInquiry = { 
      ...insertInquiry, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.contactInquiries.set(id, inquiry);
    return inquiry;
  }

  async updateContactInquiryStatus(id: number, status: string): Promise<ContactInquiry | undefined> {
    const inquiry = this.contactInquiries.get(id);
    if (inquiry) {
      const updatedInquiry = { ...inquiry, status };
      this.contactInquiries.set(id, updatedInquiry);
      return updatedInquiry;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
