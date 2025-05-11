const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] to-[#666666] text-[#333333] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-[#800020] border-t-[#FFFFF0] rounded-full animate-spin"></div>
      <p className="mt-6 text-lg font-semibold text-[#800020] animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingPage;
