// components/Footer.tsx
export default function Footer() {
  return (
    <footer className=" text-zinc-400 text-center p-4 text-sm">
      © {new Date().getFullYear()} MovieDB. All rights reserved.
    </footer>
  );
}
