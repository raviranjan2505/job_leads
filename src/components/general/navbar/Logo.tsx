import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="text-gray-300 font-bold text-xl md:text-2xl lg:text-3xl">
        < Image src="/images/logo.png" width={70} height={70} alt="logo"/>
    </Link>
  )
}
