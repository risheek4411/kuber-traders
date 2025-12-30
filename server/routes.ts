import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kubertradersbediya@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendInquiryEmail(inquiry: {
  name: string;
  phone: string;
  message?: string;
}): Promise<void> {
  try {
    const emailContent = `
New Inquiry from Website

Name: ${inquiry.name}
Phone: ${inquiry.phone}
Message: ${inquiry.message || "No message provided"}

---
This is an automated email from your Kuber Traders Bediya website.
    `.trim();

    await transporter.sendMail({
      from: "kubertradersbediya@gmail.com",
      to: "kubertradersbediya@gmail.com",
      subject: `New Inquiry from ${inquiry.name}`,
      text: emailContent,
      html: `
        <h2>New Inquiry from Website</h2>
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Phone:</strong> ${inquiry.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${(inquiry.message || "No message provided").replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>This is an automated email from your Kuber Traders Bediya website.</em></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    // Don't throw - allow inquiry to be saved even if email fails
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      
      // Send email in background (don't wait for it)
      sendInquiryEmail(input).catch((error) => {
        console.error("Email sending error:", error);
      });
      
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getProducts();
  if (existing.length === 0) {
    await storage.createProduct({
      name: "Teja Mirchi (S-17)",
      description: "Known for its high pungency and bright red color. Ideal for spice extraction and oleoresin.",
      type: "Whole Dried",
      spiceLevel: "High",
      image: "/images/teja.webp",
      features: ["High Heat", "Glossy Finish", "Export Quality"]
    });
    await storage.createProduct({
      name: "Kashmiri Mirchi",
      description: "Famous for its deep red color and mild taste. Perfect for adding color to dishes without excessive heat.",
      type: "Whole Dried",
      spiceLevel: "Low",
      image: "/images/kashmiri.webp",
      features: ["Vibrant Color", "Low Heat", "Premium Grade"]
    });
    await storage.createProduct({
      name: "Byadgi Mirchi",
      description: "Characterized by its wrinkled skin and deep red color. Offers a unique flavor profile.",
      type: "Whole Dried",
      spiceLevel: "Medium",
      image: "/images/byadgi.jpg",
      features: ["Wrinkled Skin", "Rich Flavor", "Natural Color"]
    });
    await storage.createProduct({
      name: "Guntur Sannam",
      description: "One of the most popular varieties. Hot and spicy with a distinct aroma.",
      type: "Whole Dried",
      spiceLevel: "High",
      image: "/images/guntur.jpg",
      features: ["Spicy", "Aromatic", "Traditional"]
    });
  }
}
