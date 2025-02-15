'use client'
import { useState } from "react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="bg-blue-50 dark:bg-slate-800 py-16" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">Contact</p> */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Get in Touch</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-slate-400">We’d love to hear from you!</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 dark:text-slate-400 mb-6">
              Have any questions? Reach out to us and we’ll get back to you as soon as possible.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="h-10 w-10 flex items-center justify-center rounded bg-blue-900 text-gray-50">
                  📍
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Address</h3>
                  <p className="text-gray-600 dark:text-slate-400">1230 Maecenas Street, New York, USA</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-10 w-10 flex items-center justify-center rounded bg-blue-900 text-gray-50">
                  📞
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact</h3>
                  <p className="text-gray-600 dark:text-slate-400">Phone: +1 (123) 456-7890</p>
                  <p className="text-gray-600 dark:text-slate-400">Email: tailnext@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-10 w-10 flex items-center justify-center rounded bg-blue-900 text-gray-50">
                  ⏰
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Working Hours</h3>
                  <p className="text-gray-600 dark:text-slate-400">Mon - Fri: 08:00 - 17:00</p>
                  <p className="text-gray-600 dark:text-slate-400">Sat & Sun: 08:00 - 12:00</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-slate-900 shadow-lg rounded-lg p-6 md:p-12">
            <h2 className="text-2xl font-bold dark:text-white mb-4">Ready to Get Started?</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="w-full rounded-md border border-gray-400 py-2 px-4 shadow-md dark:text-gray-300"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                className="w-full rounded-md border border-gray-400 py-2 px-4 shadow-md dark:text-gray-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Write your message..."
                className="w-full rounded-md border border-gray-400 py-2 px-4 shadow-md dark:text-gray-300"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <div className="text-center mt-6">
                <button type="submit" className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
