const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ── PROPERTIES ──────────────────────────────────────────────
const properties = [
  { id: 1, address: "123 Miami Beach Blvd, Miami FL", price: 850000, beds: 3, baths: 2, sqft: 1800, type: "Single Family", status: "available", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop" },
  { id: 2, address: "456 Brickell Ave, Miami FL", price: 1200000, beds: 4, baths: 3, sqft: 2400, type: "Luxury Condo", status: "available", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop" },
  { id: 3, address: "789 Ocean Drive, Miami Beach FL", price: 650000, beds: 2, baths: 2, sqft: 1200, type: "Condo", status: "available", img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=250&fit=crop" },
  { id: 4, address: "321 Collins Ave, Miami Beach FL", price: 975000, beds: 3, baths: 2, sqft: 2100, type: "Townhouse", status: "available", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=250&fit=crop" },
  { id: 5, address: "555 Coral Gables Dr, Coral Gables FL", price: 1850000, beds: 5, baths: 4, sqft: 4200, type: "Estate", status: "available", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=250&fit=crop" },
  { id: 6, address: "888 Wynwood Ave, Miami FL", price: 420000, beds: 1, baths: 1, sqft: 850, type: "Loft", status: "available", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop" },
  { id: 7, address: "1200 Sunny Isles Blvd, Sunny Isles FL", price: 2200000, beds: 4, baths: 3, sqft: 3100, type: "Penthouse", status: "available", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=250&fit=crop" },
  { id: 8, address: "400 Coconut Grove Rd, Miami FL", price: 780000, beds: 3, baths: 2, sqft: 1950, type: "Single Family", status: "available", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=250&fit=crop" },
  { id: 9, address: "77 Biscayne Blvd, Downtown Miami FL", price: 550000, beds: 2, baths: 2, sqft: 1100, type: "Condo", status: "available", img: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=250&fit=crop" },
];

// ── TRANSACTIONS ─────────────────────────────────────────────
let transactions = [
  { id: "BP001", propertyId: 1, buyer: "0x1a2b...3c4d", amount: 850000, crypto: "BTC", status: "escrow", kyc: true, date: "2026-05-01" },
  { id: "BP002", propertyId: 2, buyer: "0x5e6f...7g8h", amount: 1200000, crypto: "ETH", status: "pending_kyc", kyc: false, date: "2026-05-01" },
  { id: "BP003", propertyId: 3, buyer: "0x9i0j...1k2l", amount: 650000, crypto: "USDC", status: "closed", kyc: true, date: "2026-04-28" },
];

// ── ROUTES ───────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'blockPad API running', version: '1.0.0' });
});

// Get all properties
app.get('/api/properties', (req, res) => {
  const { type, minPrice, maxPrice } = req.query;
  let result = properties;
  if (type) result = result.filter(p => p.type === type);
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  res.json({ success: true, count: result.length, data: result });
});

// Get single property
app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === Number(req.params.id));
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  res.json({ success: true, data: property });
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
  res.json({ success: true, count: transactions.length, data: transactions });
});

// Create new transaction
app.post('/api/transactions', (req, res) => {
  const { propertyId, buyer, amount, crypto } = req.body;
  if (!propertyId || !buyer || !amount || !crypto) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const newTx = {
    id: 'BP' + String(transactions.length + 1).padStart(3, '0'),
    propertyId,
    buyer,
    amount,
    crypto,
    status: 'pending_kyc',
    kyc: false,
    date: new Date().toISOString().split('T')[0]
  };
  transactions.push(newTx);
  res.status(201).json({ success: true, data: newTx });
});

// Submit KYC
app.post('/api/kyc', (req, res) => {
  const { transactionId, name, email, phone, country } = req.body;
  if (!transactionId || !name || !email || !phone || !country) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const tx = transactions.find(t => t.id === transactionId);
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });
  tx.kyc = true;
  tx.status = 'escrow';
  res.json({ success: true, message: 'KYC verified', data: tx });
});

// Update transaction status (admin)
app.patch('/api/transactions/:id', (req, res) => {
  const tx = transactions.find(t => t.id === req.params.id);
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });
  tx.status = req.body.status || tx.status;
  res.json({ success: true, data: tx });
});

// Stats for admin dashboard
app.get('/api/stats', (req, res) => {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const escrow = transactions.filter(t => t.status === 'escrow').length;
  const closed = transactions.filter(t => t.status === 'closed').length;
  const pending = transactions.filter(t => t.status === 'pending_kyc').length;
  res.json({ success: true, data: { totalVolume: total, activeEscrows: escrow, closedDeals: closed, pendingKyc: pending } });
});

app.listen(PORT, () => {
  console.log('blockPad API running on port ' + PORT);
});
