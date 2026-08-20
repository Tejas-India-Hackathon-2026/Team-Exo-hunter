import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, FileText, Plus, Trash2, Printer, 
  CheckCircle2, Building2, Landmark, QrCode
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  desc: string;
  qty: number;
  price: number;
}

export const SmartAdmin = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', desc: 'Edge CCTV Sensor license', qty: 2, price: 4500 },
    { id: '2', desc: 'Face Scanner terminal kit', qty: 1, price: 12500 }
  ]);

  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('1');
  const [receiptGenerated, setReceiptGenerated] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-9042');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc || !newPrice) return;

    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      desc: newDesc,
      qty: parseInt(newQty) || 1,
      price: parseFloat(newPrice) || 0
    };

    setItems([...items, newItem]);
    setNewDesc('');
    setNewPrice('');
    setNewQty('1');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const total = subtotal + cgst + sgst;

  const handleGenerate = () => {
    setInvoiceNumber(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setReceiptGenerated(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* ambient background glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[45%] aspect-square rounded-full bg-amber-900/5 blur-[130px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/explore-smart-systems')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg tracking-tight text-amber-400 flex items-center gap-1.5">
              <Building2 className="w-5 h-5 text-amber-500" />
              Smart Admin Services
            </span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Close Dashboard
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        
        {/* Left Side: Invoice Builder Form */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-500" />
              GST Invoice Builder
            </h3>

            <form onSubmit={addItem} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Item Description:</label>
                <input 
                  type="text" 
                  value={newDesc} 
                  onChange={(e) => setNewDesc(e.target.value)} 
                  placeholder="e.g. Smart Room Temperature Sensor"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Rate (₹):</label>
                  <input 
                    type="number" 
                    value={newPrice} 
                    onChange={(e) => setNewPrice(e.target.value)} 
                    placeholder="e.g. 1500"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Quantity:</label>
                  <input 
                    type="number" 
                    value={newQty} 
                    onChange={(e) => setNewQty(e.target.value)} 
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Add Item to Ledger</span>
              </button>
            </form>
          </div>

          {/* Ledger Table */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Items Ledger</h4>
            
            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="text-center text-xs text-slate-500 py-4">No billing items entered.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-slate-950/60 border border-slate-900 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white leading-none truncate">{item.desc}</p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {item.qty} x ₹{item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white font-mono">₹{item.qty * item.price}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-600 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <button 
                onClick={handleGenerate}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-lg shadow-amber-600/20 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Invoices Receipt</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Receipt Thermal Paper Preview */}
        <div className="flex flex-col justify-start">
          {receiptGenerated && items.length > 0 ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 font-mono text-xs text-slate-300 relative overflow-hidden animate-in slide-in-from-right-4 duration-300">
              
              {/* Receipt Top Jagged Outline Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-repeat-x bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />

              {/* Receipt Header */}
              <div className="text-center space-y-1 pb-4 border-b border-dashed border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center justify-center gap-1.5 uppercase">
                  <Landmark className="w-4 h-4 text-amber-500" />
                  Disha AI Smart Invoice
                </h4>
                <p className="text-[10px] text-slate-500">Reg: Sadikpur, Patna, Bihar - 800007</p>
                <p className="text-[10px] text-slate-500">GSTIN: 10AUTOS9042A1Z2</p>
              </div>

              {/* Invoice Meta */}
              <div className="space-y-1 text-[10px] text-slate-400 pb-3 border-b border-slate-900">
                <div className="flex justify-between">
                  <span>Invoice No:</span>
                  <span className="text-white">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date/Time:</span>
                  <span>2026-08-21 02:18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>State:</span>
                  <span>BIHAR (10)</span>
                </div>
              </div>

              {/* Receipt items */}
              <div className="space-y-2 pb-4 border-b border-dashed border-slate-850">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                  <span>Particulars</span>
                  <span>Total</span>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-[11px]">
                    <div className="max-w-[70%]">
                      <span className="block text-slate-200 truncate">{item.desc}</span>
                      <span className="text-[9px] text-slate-500">{item.qty} x ₹{item.price}</span>
                    </div>
                    <span className="text-white">₹{item.qty * item.price}</span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-1 text-xs border-b border-slate-900 pb-3">
                <div className="flex justify-between text-[10px]">
                  <span>Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>CGST (9%):</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>SGST (9%):</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm pt-2">
                  <span>Grand Total:</span>
                  <span className="text-amber-400">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Footnote and validation QR Code */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <div className="space-y-1 flex-1">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold uppercase">
                    <CheckCircle2 className="w-3 h-3" />
                    MSME Certified
                  </div>
                  <p className="text-[9px] text-slate-500 leading-relaxed">
                    Invoice dynamically signed & stamped via Disha AI digital authentication nodes.
                  </p>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                  <QrCode className="w-8 h-8" />
                </div>
              </div>

              {/* Print Receipt Action */}
              <button 
                onClick={() => window.print()}
                className="w-full mt-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Copy</span>
              </button>

            </div>
          ) : (
            <div className="h-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 flex flex-col items-center justify-center p-8 text-center text-slate-500 min-h-[300px]">
              <FileText className="w-10 h-10 text-slate-700 mb-3" />
              <p className="text-xs">No active invoice session has been generated yet.</p>
              <p className="text-[10px] text-slate-600 mt-1">Configure line items on the left side and click generate to view receipt details.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
};
