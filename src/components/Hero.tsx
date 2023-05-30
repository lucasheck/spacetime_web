import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";

export function Hero() {
  return (
    <div className="max-w-[420px] space-y-5">
      <Image src={logo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-4">
        <h1 className="text-2xl font-bold leading-tight text-gray-50 lg:text-5xl">
          Sua cápsula do tempo
        </h1>
        <p className="text-base leading-relaxed lg:text-lg">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <Link
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black transition-colors hover:bg-green-600"
        href="/memories/new"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  );
}
