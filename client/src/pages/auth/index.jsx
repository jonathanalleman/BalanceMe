import React from 'react'
import {SignInButton, SignUpButton} from "@clerk/clerk-react"

function Auth() {
  return (

    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://st2.depositphotos.com/2124221/46119/i/450/depositphotos_461195752-stock-photo-abstract-geometric-background-green-gradient.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
    
        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-green-800" href="#">
              <span className="sr-only">Home</span>
              
            </a>
    
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to BalanceMePlz
            </h1>
    
            <p className="mt-4 leading-relaxed text-gray-500">
              Your stress free financial journey is just a few clicks away
            </p>
    
            <SignUpButton mode="modal"/>
        <SignInButton  mode="modal"/>
          </div>
        </main>
      </div>
    </section>
      )
    }

export default Auth