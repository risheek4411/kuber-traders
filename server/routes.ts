import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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
