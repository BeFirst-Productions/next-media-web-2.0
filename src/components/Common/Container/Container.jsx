export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-full 2xl:max-w-[1980px] px-4 sm:px-6 lg:px-8 xl:px-[180px] 2xl:px-[220px] ${className}`}>
      {children}
    </div>
  );
}