export default function Screen({ children }: { children: React.ReactNode }) {
    return (
      <section className="relative md:w-[850px] h-[100vh] mx-auto">
        {children}
      </section>
    );
  }