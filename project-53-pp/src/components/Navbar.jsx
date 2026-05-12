import { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);
  const menuItems = ['Home', 'Projects', 'Experience', 'Skills', 'Contact'];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20 flex items-center justify-center text-white font-bold">
              AJ
            </div>
            <div className="text-lg font-semibold text-white">Ankit Jha</div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative text-sm font-medium transition-colors ${
                  active === item ? 'text-purple-300' : 'text-white/80 hover:text-white'
                }`}
                onClick={() => {
                  setActive(item);
                  setOpen(false);
                }}
              >
                {item}
                {active === item && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full" />
                )}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {open ? '×' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-black/90 border border-white/10 backdrop-blur-2xl rounded-3xl p-4 space-y-3 shadow-2xl shadow-violet-500/20">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block text-white/90 py-2 px-3 rounded-2xl transition-colors ${
                  active === item ? 'bg-white/10 text-purple-300' : 'hover:bg-white/10'
                }`}
                onClick={() => {
                  setActive(item);
                  setOpen(false);
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;