import React from 'react'
import image1 from '../Assets/Images/Image1.jpg' 
import image2 from '../Assets/Images/Image2.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
	<div className="container mx-auto">
		<span className="block mb-2 text-xs font-medium tracki text-center uppercase dark:text-violet-400">How it works</span>
		<h2 className="text-5xl font-bold text-center dark:text-gray-50">Building a Career with We-GAP is Simple</h2>
		<div className="grid gap-6 my-16 lg:grid-cols-3">
			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">1</div>
				<p className="text-2xl font-semibold">
					<b>SignUp.</b><br/>Create your profile
				</p>
			</div>
			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">2</div>
				<p className="text-2xl font-semibold">
					<b>Build a Resume.</b><br/>Build a resume with our Resume Builder
				</p>
			</div>
			<div className="flex flex-col p-8 space-y-4 rounded-md dark:bg-gray-900">
				<div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-xl font-bold rounded-full dark:bg-violet-400 dark:text-gray-900">3</div>
				<p className="text-2xl font-semibold">
					<b>Connect with us.</b><br/>
          Connect with us to get one to one career consultation
				</p>
			</div>
		</div>
	</div>


	<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
		<Link rel="noopener noreferrer" to="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
		
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl ">Do u want a resume to start with?</h3>
				{/* <span className="text-xs dark:text-gray-400">February 19, 2021</span> */}
				<p>We are here to help you</p>

				<Link to="/EmployerSignUp" className="btn btn-light">Build your Resume</Link>
			</div>
      <img src={image2}  alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
		</Link>
    
    </div>

<div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
		<Link rel="noopener noreferrer" to="#" className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-900">
			<img src={image1} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-500" />
			<div className="p-6 space-y-2 lg:col-span-5">
				<h3 className="text-2xl font-semibold sm:text-4xl ">Post a Job Today</h3>
				<p>Connect with Talents</p>
				<Link to="/EmployerSignUp" className="btn btn-light">Get Started</Link>
			</div>
		</Link>
    </div>

   

    
    </section>
    
    </div>
  )
}

export default Home
