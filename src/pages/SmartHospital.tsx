import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Sparkles, Activity, ClipboardList, 
  ShieldAlert, Heart, Plus 
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  symptom: string;
  triageScore: 'Critical' | 'Urgent' | 'Stable';
  time: string;
}

export const SmartHospital = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([
    { id: 'PT-108', name: 'Rohan Mehta', age: 34, gender: 'Male', symptom: 'Acute Chest Pain', triageScore: 'Critical', time: '10 mins ago' },
    { id: 'PT-109', name: 'Sonal Sen', age: 28, gender: 'Female', symptom: 'Severe Migraine', triageScore: 'Stable', time: '15 mins ago' },
    { id: 'PT-110', name: 'Kabir Verma', age: 62, gender: 'Male', symptom: 'Difficulty Breathing', triageScore: 'Critical', time: '22 mins ago' },
    { id: 'PT-111', name: 'Priya Das', age: 45, gender: 'Female', symptom: 'High Fever & Nausea', triageScore: 'Urgent', time: '35 mins ago' }
  ]);

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('Male');
  const [newSymptom, setNewSymptom] = useState('Fever');
  const [triageOutput, setTriageOutput] = useState<{ score: string; queue: number; rec: string } | null>(null);

  const symptomTriageMap: Record<string, { score: 'Critical' | 'Urgent' | 'Stable'; rec: string }> = {
    'Chest Pain': { score: 'Critical', rec: 'Route immediately to Cardiac ER. Initialize ECG trace.' },
    'Breathing Issue': { score: 'Critical', rec: 'Supply high-flow oxygen. Assign Trauma Bay 1.' },
    'Fever': { score: 'Stable', rec: 'Administer acetaminophen. Queue for general physician assessment.' },
    'Migraine': { score: 'Stable', rec: 'Administer NSAIDs. Queue in quiet triage waiting room.' },
    'Fracture': { score: 'Urgent', rec: 'Request limb X-ray. Queue for orthopedics bay allocation.' },
  };

  const handleIntake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newAge) return;

    const mapped = symptomTriageMap[newSymptom] || { score: 'Stable', rec: 'Standard checkup queue.' };
    const newPatient: Patient = {
      id: `PT-${Math.floor(100 + Math.random() * 900)}`,
      name: newName,
      age: parseInt(newAge),
      gender: newGender,
      symptom: newSymptom,
      triageScore: mapped.score,
      time: 'Just now'
    };

    setPatients([newPatient, ...patients]);
    setTriageOutput({
      score: mapped.score,
      queue: mapped.score === 'Critical' ? 1 : mapped.score === 'Urgent' ? 3 : 7,
      rec: mapped.rec
    });

    setNewName('');
    setNewAge('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* ambient background glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[45%] aspect-square rounded-full bg-rose-900/10 blur-[130px] pointer-events-none" />

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
            <span className="font-extrabold text-lg tracking-tight text-rose-400 flex items-center gap-1.5">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/25 animate-pulse" />
              Smart Hospital Care
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* Left Side: Intake Form & AI Diagnostician */}
        <div className="md:col-span-1 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-xl space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-rose-500" />
              Patient Intake Triage
            </h3>
            
            <form onSubmit={handleIntake} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Patient Name:</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  placeholder="e.g. Priyanshu Ranjan"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Age:</label>
                  <input 
                    type="number" 
                    value={newAge} 
                    onChange={(e) => setNewAge(e.target.value)} 
                    placeholder="e.g. 45"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-rose-500/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Gender:</label>
                  <select 
                    value={newGender} 
                    onChange={(e) => setNewGender(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-rose-500/50 focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Symptoms Select:</label>
                <select 
                  value={newSymptom} 
                  onChange={(e) => setNewSymptom(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:border-rose-500/50 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Chest Pain">Acute Chest Pain</option>
                  <option value="Breathing Issue">Difficulty Breathing</option>
                  <option value="Fever">High Fever</option>
                  <option value="Migraine">Severe Migraine</option>
                  <option value="Fracture">Bone Fracture</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-lg shadow-rose-600/20 cursor-pointer flex items-center justify-center gap-1"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Process AI Triage</span>
              </button>
            </form>
          </div>

          {/* Diagnostic AI Result */}
          {triageOutput && (
            <div className="p-5 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-3 animate-in zoom-in-95 duration-200">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                AI Triage Diagnostic
              </h4>
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-900">
                  <span className="text-[9px] text-slate-500 block">Triage Priority</span>
                  <span className={`font-bold ${triageOutput.score === 'Critical' ? 'text-rose-400' : triageOutput.score === 'Urgent' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {triageOutput.score}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-900">
                  <span className="text-[9px] text-slate-500 block">Queue Spot</span>
                  <span className="text-white font-extrabold">Pos #{triageOutput.queue}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-950/50 p-2.5 rounded-lg border border-slate-900">
                <strong>AI Recommendation:</strong> {triageOutput.rec}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Active Patients Ledger List */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-rose-400" />
                Active ER Clinical Queue
              </h3>
              <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-rose-400 px-2 py-0.5 rounded">
                Live Trace: {patients.length} patients
              </span>
            </div>

            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {patients.map((p) => (
                <div 
                  key={p.id} 
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-900 hover:border-slate-800 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                      {p.id}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">{p.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {p.gender}, {p.age} yrs • <strong className="text-slate-400">{p.symptom}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-slate-500 font-mono hidden sm:inline">
                      {p.time}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      p.triageScore === 'Critical' ? 'bg-rose-500/10 border border-rose-500/25 text-rose-400' :
                      p.triageScore === 'Urgent' ? 'bg-amber-500/10 border border-amber-500/25 text-amber-400' :
                      'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
                    }`}>
                      {p.triageScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-[10px] text-amber-200/80 leading-relaxed font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Note on Integration:</strong> DISHA Smart Hospital triage routing logic communicates with central hospital servers using simulated HL7 standards.
            </span>
          </div>
        </div>

      </main>
    </div>
  );
};
