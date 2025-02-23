import { FaGithub } from "react-icons/fa";

export default function Top() {
  return (
    <section className="absolute top-5 right-5">
      <a
        href="https://github.com/yourusername/comeback-generator"
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-1.5 font-medium items-center justify-center border-2 rounded-full py-1.5 px-3 cursor-pointer hover:bg-white hover:text-black transition-all w-fit backdrop-blur-sm bg-black/40"
      >
        <FaGithub />
        Github
      </a>
    </section>
  );
}