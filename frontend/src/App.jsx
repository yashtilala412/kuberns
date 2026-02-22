import React, { useState } from 'react';
import { Github, Plus, Bell, Search, Globe, Box, Layout, Zap, Trash2, Edit3 } from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    region: 'United States - Michigan',
    framework: 'React',
    plan: 'Starter',
    port: '8080',
    variables: [{ key: 'API_URL', value: 'https://api.example.com' }]
  });
const handleSubmit = async () => {
  // Format data for Django
  const payload = {
    name: formData.name || "Untitled App",
    repo_url: "https://github.com/user/repo", // Mock repo
    owner: "Adith Narein T",
    environments: [
      {
        branch: "main",
        region: formData.region,
        framework: formData.framework,
        plan_type: formData.plan,
        port: parseInt(formData.port),
        variables: formData.variables.filter(v => v.key && v.value) // Remove empty rows
      }
    ]
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/api/webapps/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("🚀 Deployment Started! Check Django Admin for logs.");
      setStep(1); // Reset to beginning
    } else {
      const errorData = await response.json();
      console.error("Backend Error:", errorData);
      alert("Submission failed. Check console for details.");
    }
  } catch (error) {
    console.error("Network Error:", error);
    alert("Could not connect to the Backend. Is your Django server running?");
  }
};
  return (
    <div className="min-h-screen bg-[#0B0C10] text-gray-300 font-sans">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#0B0C10] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h1 className="text-blue-500 font-bold text-xl tracking-tight">Kuberns</h1>
          <div className="flex gap-6 text-sm">
            <span className="text-blue-400 border-b-2 border-blue-500 pb-4 flex items-center gap-2 cursor-pointer">
              <Layout size={16} /> Projects
            </span>
            <span className="hover:text-white pb-4 flex items-center gap-2 cursor-pointer">
              <Box size={16} /> Datastore
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
            <input className="bg-[#1A1B23] rounded-full py-2 pl-10 pr-4 text-sm w-64 border border-gray-700 focus:outline-none focus:border-blue-500" placeholder="Quick Search..." />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
            Add New <Plus size={16} />
          </button>
          <Bell size={20} className="text-gray-400" />
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full border border-gray-700"></div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-12 px-6">
        <header className="mb-10">
          <div className="flex justify-between items-center mb-2">
             <h2 className="text-3xl font-bold text-white">Create New App</h2>
             <div className="flex gap-2 items-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${step === 1 ? 'bg-blue-600 border-blue-600 text-white scale-110' : 'border-gray-700 text-gray-500'}`}>1</span>
                <div className="w-8 h-px bg-gray-700"></div>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${step === 2 ? 'bg-blue-600 border-blue-600 text-white scale-110' : 'border-gray-700 text-gray-500'}`}>2</span>
             </div>
          </div>
          <p className="text-gray-500">Connect your repository and fill in the requirements to see the app deployed in seconds.</p>
        </header>

        {step === 1 ? (
          <PageOne setStep={setStep} formData={formData} setFormData={setFormData} />
        ) : (
          <PageTwo 
             setStep={setStep} 
             formData={formData} 
             setFormData={setFormData} 
             handleSubmit={handleSubmit} // <--- Add this!
          />
        )}
      </main>
    </div>
  );
}

// --- PAGE 1: BASIC DETAILS ---
const PageOne = ({ setStep, formData, setFormData }) => {
  const plans = [
    { type: 'Starter', storage: '10 GB', bandwidth: '10 GB', ram: '10 GB', cpu: '2 GB', cost: '₹0' },
    { type: 'Pro', storage: '50 GB', bandwidth: 'Unlimited', ram: '32 GB', cpu: '8 GB', cost: '₹1500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#14151D] border border-gray-800 rounded-xl p-6">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Choose your Version Control System</h3>
        <div className="flex gap-4 mb-6">
          <div className="border border-blue-500 bg-blue-500/10 px-4 py-2 rounded-lg flex items-center gap-2 text-blue-400 text-sm font-semibold">
            <Github size={18} /> Github <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded">CONNECTED</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0B0C10] p-3 rounded border border-gray-800 text-sm">Adith Narein T</div>
          <div className="bg-[#0B0C10] p-3 rounded border border-gray-800 text-sm">Kuberns-App</div>
          <div className="bg-[#0B0C10] p-3 rounded border border-blue-500 text-sm text-blue-400">main</div>
        </div>
      </div>

      <div className="bg-[#14151D] border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Fill in the details of your App</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase">App Name</label>
            <input 
              type="text"
              className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg p-3 text-sm focus:border-blue-500 outline-none text-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. CloudCity"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase">Region</label>
            <select className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg p-3 text-sm outline-none text-white">
              <option>United States - Michigan</option>
              <option>Asia Pacific - Mumbai</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase">Framework</label>
            <select className="w-full bg-[#0B0C10] border border-gray-800 rounded-lg p-3 text-sm outline-none text-white">
              <option>React</option>
              <option>Vue.js</option>
              <option>Django</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-white mb-4">Plan Type</h4>
          <div className="overflow-hidden border border-gray-800 rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0B0C10] text-gray-500 uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-4">Plan Type</th>
                  <th className="p-4">Storage</th>
                  <th className="p-4">Bandwidth</th>
                  <th className="p-4">Memory (RAM)</th>
                  <th className="p-4">CPU</th>
                  <th className="p-4">Monthly Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {plans.map((p) => (
                  <tr 
                    key={p.type}
                    onClick={() => setFormData({...formData, plan: p.type})}
                    className={`cursor-pointer transition-all ${formData.plan === p.type ? 'bg-blue-600/10' : 'hover:bg-gray-800/40'}`}
                  >
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${p.type === 'Starter' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-400'}`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{p.storage}</td>
                    <td className="p-4 text-gray-400">{p.bandwidth}</td>
                    <td className="p-4 text-gray-400">{p.ram}</td>
                    <td className="p-4 text-gray-400">{p.cpu}</td>
                    <td className="p-4 text-white font-semibold">{p.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setStep(2)}
        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
      >
        Set Up Env Variables <Zap size={18} />
      </button>
    </div>
  );
};

// --- PAGE 2: PORT & ENV VARIABLES ---
const PageTwo = ({ setStep, formData, setFormData ,handleSubmit}) => {
  const addVariable = () => {
    setFormData({
      ...formData,
      variables: [...formData.variables, { key: '', value: '' }]
    });
  };

  const removeVariable = (index) => {
    const newVars = formData.variables.filter((_, i) => i !== index);
    setFormData({ ...formData, variables: newVars });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="bg-[#14151D] border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Port Configuration</h3>
        <p className="text-gray-500 text-sm mb-6">You can choose a specific port for your application, or we'll assign one automatically.</p>
        
        <div className="flex items-center gap-6">
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="port" defaultChecked className="accent-blue-500" />
              <span className="text-sm">Assign a random port</span>
           </label>
           <div className="bg-[#0B0C10] border border-green-900/50 px-4 py-2 rounded-lg text-xs text-green-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              localhost:8080
           </div>
        </div>
      </div>

      <div className="bg-[#14151D] border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Configure Environment Variables</h3>
            <p className="text-gray-500 text-sm">Manage and customize your environment variables for this deployment.</p>
          </div>
          <button onClick={addVariable} className="text-blue-500 text-sm flex items-center gap-1 hover:text-blue-400">
            <Plus size={16} /> Add New
          </button>
        </div>

        <div className="space-y-4">
          {formData.variables.map((v, i) => (
            <div key={i} className="flex gap-4 items-center group">
               <div className="flex-1 bg-[#0B0C10] border border-gray-800 rounded-lg flex items-center px-3">
                  <span className="text-gray-600 mr-2"><Edit3 size={14}/></span>
                  <input 
                    className="bg-transparent py-3 text-sm outline-none w-full" 
                    placeholder="Key" 
                    value={v.key}
                    onChange={(e) => {
                       const next = [...formData.variables];
                       next[i].key = e.target.value;
                       setFormData({...formData, variables: next});
                    }}
                  />
               </div>
               <div className="flex-1 bg-[#0B0C10] border border-gray-800 rounded-lg flex items-center px-3">
                  <span className="text-gray-600 mr-2"><Edit3 size={14}/></span>
                  <input 
                    className="bg-transparent py-3 text-sm outline-none w-full" 
                    placeholder="Value" 
                    value={v.value}
                    onChange={(e) => {
                       const next = [...formData.variables];
                       next[i].value = e.target.value;
                       setFormData({...formData, variables: next});
                    }}
                  />
               </div>
               <button onClick={() => removeVariable(i)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
               </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button 
            onClick={() => setStep(1)}
            className="flex-1 py-4 border border-gray-800 text-gray-400 font-bold rounded-xl hover:bg-gray-800 transition-all"
        >
            Back
        </button>
        <button 
            onClick={handleSubmit}
            className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
        >
            Finish my Setup 🚀
        </button>
      </div>
    </div>
  );
};