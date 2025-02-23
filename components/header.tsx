import Image from 'next/image';

export default function Header() {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="p-3">
          <div className="relative w-full h-[200px] md:h-[250px] rounded-xl overflow-hidden">
            <Image
              src="/images/main-image.gif"
              alt="header"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center px-3">
          <h1 className="md:text-6xl text-4xl font-bricolage font-semibold text-neon text-center">
            Comeback Generator
          </h1>
          <p className="text font-poppins text-center text-zinc-300">
            Generate witty and clever comebacks instantly! Perfect for those moments when you need a sharp response. 
            Stay quick-witted with AI-powered comebacks! 🎯
          </p>
        </div>
      </div>
    </section>
  );
}