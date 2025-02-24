import { FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="py-6">
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col justify-center items-center font-semibold">
          <h2>Thanks for visiting!</h2>
          <p>
            Made by <span className="text-neon">Brad McCourt</span>
          </p>
        </div>

        <a
          href="https://twitter.com/LewisBradley77"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-1.5 w-fit items-center border font-semibold rounded-full px-3 py-1 hover:bg-white hover:text-black transition-all animate-pulse hover:animate-none"
        >
          <FaXTwitter /> Follow Me
        </a>
      </div>
    </footer>
  );
}