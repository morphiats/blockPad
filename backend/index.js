const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('MongoDB error:', err));

const txSchema = new mongoose.Schema({
  propertyId: Number,
  buyer: String,
  amount: Number,
  crypto: String,
  status: { type: String, default: 'pending_kyc' },
  kyc: { type: Boolean, default: false },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const Transaction = mongoose.model('Transaction', txSchema);

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

app.get('/', (req, res) => {
  res.json({ status: 'blockPad API running', version: '1.0.0' });
});

app.get('/api/properties', (req, res) => {
  const { type, minPrice, maxPrice } = req.query;
  let result = properties;
  if (type) result = result.filter(p => p.type === type);
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/properties/:id', (req, res) => {
  const property = properties.find(p => p.id === Number(req.params.id));
  if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
  res.json({ success: true, data: property });
});

app.get('/api/transactions', async (req, res) => {
  const txs = await Transaction.find();
  res.json({ success: true, count: txs.length, data: txs });
});

app.post('/api/transactions', async (req, res) => {
  const { propertyId, buyer, amount, crypto } = req.body;
  if (!propertyId || !buyer || !amount || !crypto) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const tx = await Transaction.create({ propertyId, buyer, amount, crypto });
  res.status(201).json({ success: true, data: tx });
});

app.post('/api/kyc', async (req, res) => {
  const { transactionId, name, email, phone, country } = req.body;
  if (!transactionId || !name || !email || !phone || !country) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const tx = await Transaction.findByIdAndUpdate(transactionId, { kyc: true, status: 'escrow' }, { new: true });
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });
  res.json({ success: true, message: 'KYC verified', data: tx });
});

app.patch('/api/transactions/:id', async (req, res) => {
  const tx = await Transaction.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!tx) return res.status(404).json({ success: false, message: 'Transaction not found' });
  res.json({ success: true, data: tx });
});

app.get('/api/stats', async (req, res) => {
  const txs = await Transaction.find();
  const total = txs.reduce((sum, t) => sum + t.amount, 0);
  const escrow = txs.filter(t => t.status === 'escrow').length;
  const closed = txs.filter(t => t.status === 'closed').length;
  const pending = txs.filter(t => t.status === 'pending_kyc').length;
  res.json({ success: true, data: { totalVolume: total, activeEscrows: escrow, closedDeals: closed, pendingKyc: pending } });
});

app.listen(PORT, () => console.log('blockPad API running on port ' + PORT));
