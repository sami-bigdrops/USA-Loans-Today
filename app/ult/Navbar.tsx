import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-20">
              <div className="shrink-0">
                <Link href="/" className="block">
                  <Image
                    src="/brand.svg"
                    alt="USA Loans Today Logo"
                    width={180}
                    height={40}
                    priority
                    quality={90}
                    loading="eager"
                    className="h-auto w-50 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )
}

export default Navbar