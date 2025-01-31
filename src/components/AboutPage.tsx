"use client";

const AboutPage = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          About Us
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              Our mission is to provide high-quality, affordable products that
              enhance the daily lives of our customers. We are committed to
              delivering exceptional value and building lasting relationships
              with our community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
            <p className="text-lg text-gray-700">
              We started with a simple goal: to create a platform where people
              could easily find top-notch products and make purchases with
              confidence. Over time, we have grown into a trusted name in the
              industry, serving customers all over the globe. Our commitment to
              quality and customer satisfaction drives everything we do.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
            <ul className="list-disc pl-6 text-lg text-gray-700">
              <li>
                Customer Satisfaction: We prioritize our customers above all
                else.
              </li>
              <li>
                Innovation: We continually strive to improve and innovate.
              </li>
              <li>
                Integrity: We believe in honesty and transparency in everything
                we do.
              </li>
              <li>
                Sustainability: We are committed to eco-friendly practices and
                reducing our carbon footprint.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-700">
              Our dedicated team is the heart of our company. With expertise in
              various fields and a passion for delivering excellence, we work
              together to bring you the best products and service. We are always
              here to help and are excited to serve you.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
