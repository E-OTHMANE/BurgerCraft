interface WelcomeProps {
  navigateToBuilder: () => void;
}

export default function Welcome({ navigateToBuilder }: WelcomeProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="max-w-md mx-auto px-4 py-10 text-center">
        <div className="mb-8">
          <svg className="w-32 h-32 mx-auto" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#F97316" />
            <rect x="30" y="35" width="40" height="30" rx="3" fill="#F0C080" />
            <rect x="25" y="50" width="50" height="5" rx="2" fill="#84CC16" />
            <rect x="28" y="55" width="44" height="8" rx="2" fill="#7C2D12" />
            <rect x="25" y="63" width="50" height="5" rx="2" fill="#FACC15" />
            <rect x="30" y="68" width="40" height="7" rx="3" fill="#F0C080" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-[#4B3621] mb-6">BurgerFy</h1>
        <p className="text-xl mb-10 text-gray-600">Create your perfect burger, exactly how you like it!</p>
        <button 
          onClick={navigateToBuilder}
          className="bg-[#F97316] hover:bg-[#B91C1C] text-white text-lg font-semibold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 focus:outline-none"
        >
          Welcome to BurgerFy
        </button>
      </div>
    </div>
  );
}
