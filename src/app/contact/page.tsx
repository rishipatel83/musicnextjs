'use client'

import { BackgroundBeams } from "@/components/ui/background-beams"
import { FormEvent, useState } from "react"

function MusicSchoolContactUs() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log('Submitted',{email, message});

        setEmail('')
        setMessage('')

        setShowPopup(true)
        setTimeout(() => {
            setShowPopup(false)
        }, 3000);
    }
    
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
                <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
                {showPopup && (
                <div className="fixed bottom-5 right-5 z-50 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium animate-bounce dashboard-toast">
                    Form submitted Successfully! ✓
                </div>
                )}
                <div className="max-w-2xl mx-auto p-4 relative z-10">
                    <h1 className="md:text-7xl sm:text-5xl text-3xl text-center font-sans font-bold mb-8 text-white">Contact Us</h1>
                    <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
                    We&apos;re here to help with any questions about our courses, programs, or events. Reach out and let us know how we can assist you in your musical journey.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                            required
                        />
                        <textarea
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            placeholder="Your Message"
                            rows={5}
                            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700"
                            required
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 block mx-auto"
                        >
                            Send Message
                        </button>
                    </form>
            </div>
        </div>
    )
}

export default MusicSchoolContactUs
